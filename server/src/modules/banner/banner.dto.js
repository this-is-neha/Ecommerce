const Joi=require("joi")
const BannerCreateDTO=Joi.object({
    title:Joi.string().min(3).required(),
    link:Joi.string().uri().empty(null," ").optional().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.string()
})

const BannerUpdateDTO=Joi.object({
    title:Joi.string().min(3).required(),
    link:Joi.string().uri().empty(null," ").optional().default(null),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.string().empty(null,"").optional().default(null)
  
})



module.exports={
    BannerCreateDTO,
    BannerUpdateDTO
}