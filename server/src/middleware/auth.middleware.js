// const auth = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     console.log("Authorization Header:", authHeader); // Debugging line
    
//     if (!authHeader) {
//         return res.status(401).json({ message: "Authorization header missing" });
//     }

//     const parts = authHeader.split(' ');
//     if (parts.length !== 2 || parts[0] !== 'Bearer') {
//         return res.status(401).json({ message: "Invalid authorization header format" });
//     }

//     const token = parts[1];
//     console.log("Extracted Token:", token); // Debugging line

//     if (!token) {
//         return res.status(401).json({ message: "Token missing" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded token:", decoded); // Debugging line

//         const user = await authSvc.findOneUser({ _id: decoded.sub });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         req.authUser = user;
//         console.log("Authenticated user:", user); // Debugging line
//         next();
//     } catch (err) {
//         console.error("Token verification error:", err); // Debugging line
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };

// module.exports = auth;


// const jwt = require('jsonwebtoken');
// const authSvc = require('../modules/auth/auth.service'); // Assuming you have a service to interact with users

// const auth = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         console.log("Authorization Header:", authHeader); // Debugging line

//         if (!authHeader) {
//             return res.status(401).json({ message: "Authorization header missing" });
//         }

//         const parts = authHeader.split(' ');
//         if (parts.length !== 2 || parts[0] !== 'Bearer') {
//             return res.status(401).json({ message: "Invalid authorization header format" });
//         }

//         const token = parts[1];
//         console.log("Extracted Token:", token); // Debugging line

//         if (!token) {
//             return res.status(401).json({ message: "Token missing" });
//         }

//         try {
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             console.log("Decoded token:", decoded); // Debugging line

//             // Example: Fetch user from database using authSvc
//             const user = await authSvc.findOneUser({ _id: decoded.sub });
//             if (!user) {
//                 return res.status(404).json({ message: "User not found" });
//             }
//             req.authUser = user;
//             console.log("Authenticated user:", user); // Debugging line
//             next();
//         } catch (err) {
//             console.error("Token verification error:", err); // Debugging line
//             return res.status(401).json({ message: "Invalid token" });
//         }
//     } catch (err) {
//         console.error("Auth middleware error:", err); // Debugging line
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports = auth;



const jwt = require('jsonwebtoken');
const authSvc = require('../modules/auth/auth.service'); // Assuming you have a service to interact with users

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader); // Debugging line

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: "Invalid authorization header format" });
        }

        const token = parts[1];
        console.log("Extracted Token:", token); // Debugging line

        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded); // Debugging line

            const user = await authSvc.findOneUser({ _id: decoded.sub });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.authUser = user;
            console.log("Authenticated user:", user); // Debugging line
            next();
        } catch (err) {
            console.error("Token verification error:", err); // Debugging line
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (err) {
        console.error("Auth middleware error:", err); // Debugging line
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = auth;
