const CategoryModel=require("./category.model")
const slugify=require("slugify")
class CategoryService {
    transformCreateData=(req)=>{

        const data={
...req.body
        }
        if(req.file){
            data.image=req.file.filename;
        }
           
            data.slug=slugify(data.title,{
                lower:true
            })
            if(!data.parentId||data.parentId==='null'||data.parentId===""){
                data.parentId=null
            }
            data.section = req.body.section;
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
                        if(!data.parentId||data.parentId==='null'||data.parentId===""){
                            data.parentId=null
                        }
                        
                        data.updatedBy=req.authUser._id;
                    return data;
        
    }

    store=async(data)=>{
        try{
const brand=new CategoryModel(data);
return await brand.save()
        }
        catch(exception){
            throw exception
        }

    }
    listAll = async ({ limit, skip, filter = {} }) => {
        try {
          const response = await CategoryModel.find(filter)
            .populate("parentId", ["_id", "title", "slug"])
            .populate("createdBy", ["_id", "name", "email", "role"])
            .populate("updatedBy", ["_id", "name", "email", "role"])
            .sort({ _id: "desc" })
            .limit(limit)
            .skip(skip);
          return response;
        } catch (exception) {
          throw (exception);
        }
      }
    
      count = async (filter = {}) => {
        try {
          const countData = await CategoryModel.countDocuments(filter);
          return countData;
        } catch (exception) {
          throw (exception);
        }
      }
    findOne=async(filter)=>
    {
        try{

            const data=await CategoryModel.findOne(filter)
            .populate("parentId",["_id","title","slug"])
            .populate("createdBy",["_id","name","email","role"])
            .populate("updatedBy",["_id","name","email","role"])
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
const updateResponse=await CategoryModel.findOneAndUpdate(filter,{$set:data})
return updateResponse
    
}
    catch(exception){
        throw (exception)
    }
}


deleteOne=async(filter)=>{
    try{
const response=await CategoryModel.findOneAndDelete(filter)
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
const data=await CategoryModel.find({
    status:"active"
    })
            .populate("parentId",["_id","title","slug"])
            .populate("createdBy",["_id","name","email","role"])
            .populate("updatedBy",["_id","name","email","role"])
    .sort({_id:"desc"})
    .limit(10)
    return data
    }
    catch(exception){
        throw(exception)
    }
}
}
const categorySvc=new CategoryService()
module.exports=categorySvc;