// const allowRole=(allowedRole)=>{
//   return(req,res,next)=>{
//     try{
// const loggedInUser=req.authUser||null;
// if(!loggedInUser){
//     next({
//         code:401,
//         message:"Please login first"

//     })
// }
// else{
//     const role=loggedInUser.role;
//     if(typeof allowedRole==='string'&&allowedRole===role){
//         next();
//     }
//     else if(Array.isArray(allowedRole)&& allowedRole.includes(role)){
//         next();

//     }
//     else{
//         next({
//             code:403,
//             message:"You do not have priviledge to access this api"
//         })
//     }
// }
//     }
//     catch(exception){
//         next(exception)
//     }
//   }  
// }

// module.exports=allowRole

// rbac.middleware.js



const allowRole = (role) => {
    return (req, res, next) => {
        if (!req.authUser || req.authUser.role !== role) {
            console.log("Role check failed:", req.authUser ? req.authUser.role : "No user"); // Debugging line
            return res.status(403).json({ message: "You do not have privilege to access this API" });
        }
        next();
    };
};

module.exports = allowRole;
