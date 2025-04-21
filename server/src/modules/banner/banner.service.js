const BannerModel=require("./banner.model")
class BannerService {
    transformCreateData=(req)=>{

        const data={
...req.body
        }
        if(!req.file){
            throw {
                code:400,
                message:"Image is Required"
            }
        }
            else{
                data.image=req.file.filename;

            }
            data.createdBy=req.authUser._id;
        return data;
    }

    transformUpdateData=(req,existingData)=>{
        const data={
            ...req.body
                    }
                    if(req.file){
                        data.image=req.file.filename;
                    }
                        else{
                            data.image=existingData.image
            
                        }
                        data.updatedBy=req.authUser._id;
                    return data;
        
    }

    store=async(data)=>{
        try{
const banner=new BannerModel(data);
return await banner.save()
        }
        catch(exception){
            throw exception
        }

    }
    count=async(filter)=>{
        try{
const  countData=await BannerModel.countDocuments(filter);
return countData
        }
        catch(exception){
          throw (exception)  
        }

    }
    listAll=async({limit,skip,filter={}})=>{
        try{
            const response=await BannerModel.find(filter)
           .sort({_id:"desc"})
           .limit(limit)
           .skip(skip)
            return response

        }
        catch(exception){
            throw (exception)
        }
    }

    findOne=async(filter)=>
    {
        try{

            const data=await BannerModel.findOne(filter);
            if(!data){
                throw{
                    code:400,
                    message:"Data not found"
                }
               
            }
            return data;
        }
        catch(exception){
            throw exception
        }
    }
update=async(filter,data)=>{
    try{
const updateResponse=await BannerModel.findOneAndUpdate(filter,{$set:data})
return updateResponse
    
}
    catch(exception){
        throw (exception)
    }
}


deleteOne=async(filter)=>{
    try{
const response=await BannerModel.findOneAndDelete(filter)
if(!response){
    throw{
        code:404,
        message:"Brand does not exists"
    }
}
return response
    }
    catch(exception){
        throw(exception)
    }
}

getForHome=async()=>{
    try{
const data=await BannerModel.find({
    status:"active"
    })
    .sort({_id:"desc"})
    .limit(10)
    return data
    }
    catch(exception){
        throw(exception)
    }
}
}
const bannerSvc=new BannerService()
module.exports=bannerSvc