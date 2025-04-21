require("dotenv").config()
const mailSvc = require('../../services/mail.service')
const authSvc = require("./auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {

    


    register = async (req, res, next) => {
        try {
            
            console.log("Incoming Request Body:", req.body);
    
            const data = authSvc.transformRegisterData(req);
            console.log("Transformed Data for Registration:", data);
    
    
            const registeredData = await authSvc.createUser(data);
    
        
            await mailSvc.sendEmail(
                registeredData.email,
                "Activate your Account!",
                `Dear ${registeredData.name || "User"},<br/>
                <p>You have registered your account with username <strong>${registeredData.email}</strong>.</p>
                <p>Please click the link below or copy and paste the URL in your browser to activate your account:</p>
                <a href="${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}">
                ${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}</a><br/>
                <p>Regards,</p>
                <p>${process.env.SMTP_FROM}</p>
                <p><small><em>Please don't reply to this email.</em></small></p>`
            );
    
            // Respond to the client
            res.json({
                result: registeredData,
                message: "Register success",
                meta: null,
            });
        } catch (exception) {
            console.error("Error in Register:", exception);
            next(exception);
        }
    };
    
    login = async (req, res, next) => {

        try {
            const { email, password } = req.body;
            const userDetail = await authSvc.findOneUser({
                email: email
            })
            if (!userDetail) {
                throw ({
                    code: 422,
                    message: "User does not exists"
                })
            }
            if (bcrypt.compareSync(password, userDetail.password)) {
                if (userDetail.status != 'active') {
                    throw {
                        code: 400,
                        message: "Your account has not been activated.Please activate or contact administration"
                    }
                }
                const accessToken = jwt.sign({
                    sub: userDetail._id
                }, process.env.JWT_SECRET)

                const refreshToken = jwt.sign({
                    sub: userDetail._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                })

                res.json({
                    result: {
                        detail: {
                            _id: userDetail._id,
                            name: userDetail?.name,
                            email: userDetail.email,
                            role: userDetail.role,
                            status: userDetail.status,
                            image: userDetail.image
                        },
                        token: {
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        }
                    }, messgae: "log in successfull",
                    meta: null
                })
                console.log("Logged in")
                console.log("UserId:",userDetail._id)
                console.log("User name:",userDetail.name)
                console.log("User email:",userDetail.email)
                console.log("User role:",userDetail.role)
                console.log("User status:",userDetail.status)
                console.log("User image:",userDetail.image)
            }
            else {
                throw ({
                    code: 400,
                    message: "Credentials does not match"
                })
               
            }
        }
        catch (exception) {

            throw (exception)
        }




    }
    activate = async (req, res, next) => {
        try {
            const token = req.params.token
            const associatedUser = await authSvc.findOneUser({
                activationToken: token
            })
            if (!associatedUser) {
                throw {
                    code: 400,
                    message: "Token doesnot exists"
                }
            }
            const updateResult = await authSvc.updateUser({
                activationToken: null,
                status: "active",

            }, associatedUser._id);


            res.json({
                result: updateResult,
                messsge: "Your account has beeen activated successfully",
                meta: null
            })
        }
        catch (exception) {
            next(exception)
        }

    }


    

    forgotPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            console.log("Received email:", email);

            if (!email) {
                console.log("Email not provided");
                return res.status(400).json({ message: "Email is required" });
            }


            const user = await authSvc.findOneUser({ email });
            console.log("User found:", user);

            if (!user) {
                console.log("No user found for this email");
                throw { code: 422, message: "User with this email does not exist" };
            }


            const resetToken = jwt.sign(
                { sub: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            console.log("Generated reset token:", resetToken);


            const updateResult = await authSvc.updateUser({ resetToken }, user._id);
            console.log("Update result:", updateResult);


            const resetLink = `${process.env.FRONTEND_URL}/resetp/${resetToken}`;
            const emailResult = await mailSvc.sendEmail(
                user.email,
                "Reset Your Password",
                `
                    <p>Hello ${user.name},</p>
                    <p>Click the link below to reset your password:</p>
                    <a href="${resetLink}">${resetLink}</a>
                    <p>If you did not request this, ignore this email.</p>
                `
            );
            console.log("Email sent result:", emailResult);

            res.json({ message: "Password reset email sent successfully" });
        } catch (exception) {
            console.error("Error in forgotPassword:", exception);
            next(exception);
        }
    };

    
    
    checkResetToken = async (req, res, next) => {
        try {
            const token = req.params.token;

            if (!token) {
                return res.status(400).json({ message: "Token is missing" });
            }

            console.log("Received token:", token);

            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log("Decoded token:", decoded);
            } catch (err) {
                console.error("JWT verification error:", err);
                if (err.name === "TokenExpiredError") {
                    return res.status(400).json({ message: "Token has expired" });
                }
                if (err.name === "JsonWebTokenError") {
                    return res.status(400).json({ message: "Invalid token" });
                }
                throw err;
            }

            // Debugging the user query
            const filter = { _id: decoded.sub, resetToken: token };
            console.log("Searching for user with filter:", filter);
            const user = await authSvc.findOneUserById(filter);

            if (!user) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }

            res.json({
                message: "Token is valid",
                result: null,
                meta: null
            });
        } catch (exception) {
            console.error("Error in checkResetToken:", exception);
            next(exception);
        }
    }


    changePassword = async (req, res, next) => {
        try {
            const { newPassword } = req.body;


            if (!newPassword) {
                return res.status(400).json({ message: "New password is required" });
            }


            if (newPassword.length < 8) {
                return res.status(400).json({ message: "Password must be at least 8 characters long" });
            }

                  console.log("New Password id ", newPassword)
            const user = req.authUser;


            const hashedPassword = bcrypt.hashSync(newPassword, 10);

            const updatedUser = await authSvc.updateUser({ password: hashedPassword }, user._id);

            res.json({
                message: "Password updated successfully",
                result: updatedUser,
                meta: null
            });
        } catch (exception) {
            console.error("Error in changePassword:", exception);
            next(exception);
        }
    };

    getLoggedIn = async (req, res, next) => {
        try {
            console.log("Inside getLoggedIn, Auth User:", req.authUser); // Debugging line
    
            
            if (!req.authUser) {
                return res.status(401).json({ message: "User not authenticated" });
            }
    
            const loggedInUser = req.authUser;
            const response = {
                _id: loggedInUser._id,
                name: loggedInUser.name,
                email: loggedInUser.email,
                // Avoid sending sensitive data like passwords
                role: loggedInUser.role,
                status: loggedInUser.status,
                image: loggedInUser?.image,
            };
    
            res.json({
                result: response,
                message: "Your Profile",
                meta: null,
            });
        } catch (exception) {
            console.error("Error in getLoggedIn:", exception); // Debugging line
            next(exception);
        }
    };
    

    adminAccess = async (req, res, next) => {
        try {
            res.json({
                result: "I am only accessed by admin",
                message: "Only by admin",
                meta: null

            })
        }
        catch (exception) {
            next(exception)
        }
    }
}



const authCtrl = new AuthController()
module.exports = authCtrl