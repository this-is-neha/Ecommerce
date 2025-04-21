const BrandModel=require("./brand.model")
const slugify=require("slugify")
class BrandService {
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
            data.slug=slugify(data.title,{
                lower:true
            })
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
const brand=new BrandModel(data);
return await brand.save()
        }
        catch(exception){
            throw exception
        }

    }
    count=async(filter)=>{
        try{
const  countData=await BrandModel.countDocuments(filter);
return countData
        }
        catch(exception){
          throw (exception)  
        }

    }
    listAll=async({limit,skip,filter={}})=>{
        try{
            const response=await BrandModel.find(filter)
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

            const data=await BrandModel.findOne(filter);
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
const updateResponse=await BrandModel.findOneAndUpdate(filter,{$set:data})
return updateResponse
    
}
    catch(exception){
        throw (exception)
    }
}


deleteOne=async(filter)=>{
    try{
const response=await BrandModel.findOneAndDelete(filter)
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
const data=await BrandModel.find({
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
const brandSvc=new BrandService()
module.exports=brandSvc;

