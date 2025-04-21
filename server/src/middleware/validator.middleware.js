const bodyValidator=(schema,fileUplaodField=null)=>{
return async (req,res,next)=>{
try{
  const data=req.body;
  if(fileUplaodField){
    fileUplaodField.map((uploadField)=>{
if(!data[uploadField]){
  data[uploadField]=null
}
    })

  }
  console.log("data",data)
  await schema.validateAsync(data, {abortEarly:false})
   next()
}
catch(exception){
    next(exception)
}
}
}
module.exports={bodyValidator}