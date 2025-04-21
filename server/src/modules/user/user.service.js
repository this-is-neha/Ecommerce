const UserModel=require('./user.model')
class UserService{
    count = async (filter) => {
        try {
            const countData = await UserModel.countDocuments(filter);
            return countData
        }
        catch (exception) {
            throw (exception)
        }

    }


    listAll = async ({ limit, skip, filter = {} }) => {
        try {
            const response = await UserModel.find(filter)
             
                .populate("createdBy", ["_id", "name", "email", "role"])
                .populate("updatedBy", ["_id", "name", "email", "role"])
                .sort({ _id: "desc" })
                .skip(skip)
                .limit(limit)
            return response

        }
        catch (exception) {
            throw (exception)
        }
    }
}



const userSvc=new UserService()
module.exports=userSvc