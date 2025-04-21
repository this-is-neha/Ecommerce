require("dotenv").config()
const mailSvc = require('../../services/mail.service')
const authSvc = require("./auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {

    // register = async (req, res, next) => {
    //     try {
    //         const data = authSvc.transformRegisterData(req)

    //         const registeredData = await authSvc.createUser(data)
    //         await mailSvc.sendEmail(
    //             registeredData.email,
    //             "Activate your Account!",
    //             ` Dear ${registeredData.name}</br>
    //             <p> You have registered your account with usernamr <strong>${registeredData.email} </strong>.</p>
    //             <p> Please click the link below or copy and paste the url in browserto activaer your account:</p>
    //             <a  href = "${process.env.FRONTEND_URL}/activate/${registeredData.activationToken}" >
    //             ${process.env.FRONTEND_URL}/actiavte/${registeredData.activationToken} </a> <br/>
    //             <p>Regards ,</p>
    //             <p>${process.env.STMP_FORM}</p>
    //             <p><small><em> Please dont reply to this email via any mailservices</em></small></p>`
    //         )

    //         res.json({
    //             result: registeredData,
    //             message: "Register success",
    //             meta: null
    //         })
    //     }
    //     catch (exception) {
    //         next(exception)
    //     }
    // }


    register = async (req, res, next) => {
        try {
            // Log the incoming request body
            console.log("Incoming Request Body:", req.body);
    
            // Transform the data
            const data = authSvc.transformRegisterData(req);
            console.log("Transformed Data for Registration:", data);
    
            // Create the user
            const registeredData = await authSvc.createUser(data);
    
            // Send the activation email
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


    // getLoggedIn = async (req, res, next) => {
    //     try {
    //         const loggedInUser = req.authUser;
    //         const response = {
    //             _id: loggedInUser._id,
    //             name: loggedInUser.name,
    //             email: loggedInUser.email,
    //             password: loggedInUser.password,
    //             role: loggedInUser.role,
    //             status: loggedInUser.status,
    //             image: loggedInUser?.image

    //         }
    //         res.json({
    //             result: response,
    //             message: "Your Profile",
    //             meta: null
    //         })
    //     }
    //     catch (exception) {
    //         next(exception)
    //     }

    // }

    
    getLoggedIn = async (req, res, next) => {
        try {
            console.log("Inside getLoggedIn, Auth User:", req.authUser); // Debugging line
    
            // Ensure the user is set from the middleware
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