const { generateRandomString } = require('../../utilities/helpers')
const bcrypt = require("bcryptjs")
const UserModel=require("../user/user.model")
class AuthService{
    transformRegisterData=(req)=>{
        try{
            let payload = req.body
            payload.password = bcrypt.hashSync(payload.password, 10)
            payload.status = "inactive"
            payload.activationToken = generateRandomString(100)
            if (req.file) {
                payload.image = req.file.filename
            }
            return payload
        }
        catch(exception){
   throw (exception)
        }
    }
    createUser=async (data)=>{
        try{
   const user=new UserModel(data);
   return await user.save()
        }
        catch(exception){
            throw exception
        }
    }
    findOneUserById = async (filter) => {
        try {
            console.log("Finding user with filter:", filter);
            
            if (!filter._id || !filter.resetToken) {
                throw new Error("Invalid filter, missing required fields");
            }
    
            
            const currentTime = Math.floor(Date.now() / 1000); 
            if (filter.exp < currentTime) {
                throw new Error("Reset token has expired");
            }
    
            const userObj = await UserModel.findOne({ _id: filter._id });
    console.log("User is ",userObj)
            if (!userObj) {
                console.error("User not found with filter:", filter);
                throw new Error("User not found");
            }
    
            console.log("User found:", userObj);
            return userObj;
        } catch (exception) {
            console.error("Error details:", exception);
            throw new Error("Error finding user: " + exception.message);
        }
    }
    
    findOneUser=async(filter)=>{
        try{
  const userObj=await UserModel.findOne(filter)
  return userObj
        }
        catch(exception){
            throw(exception)
        }
    }
    updateUser=async(data,userId)=>{
        try{
const result=await UserModel.findByIdAndUpdate(userId,{$set:data});
        return result
}
        catch(exception){
            throw(exception)
        }
    }
    verifyToken = (token) => {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Use your secret key here
          return decoded; // Return the decoded payload if token is valid
        } catch (err) {
          throw new Error("Invalid or expired token: " + err.message);
        }
      }
    
      // Reset password functionality using token
      resetPassword = async (token, newPassword) => {
        try {
          const decoded = this.verifyToken(token);
          const user = await this.findOneUser({ _id: decoded.sub, resetToken: token });
    
          if (!user) {
            throw new Error("Invalid or expired token");
          }
    
          const hashedPassword = bcrypt.hashSync(newPassword, 10);
          user.password = hashedPassword;
          user.resetToken = null; // Remove the reset token once it's used
    
          await user.save();
          return { message: "Password reset successfully" };
        } catch (err) {
          throw new Error("Error resetting password: " + err.message);
        }
      }
}

const authSvc = new AuthService()
module.exports=authSvc