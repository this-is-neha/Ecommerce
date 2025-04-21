const Joi=require("joi")
const CategoryCreateDTO=Joi.object({
    title:Joi.string().min(3).required(),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.string().empty(null,"").optional().default(null),
    parentId:Joi.string().allow(null,"").default(null),
    section: Joi.string().valid('Men\'s Fashion', 'Women\'s Fashion','Kid\'s Fashion','Electronics','Miscellanous').required() 
})

const CategoryUpdateDTO=Joi.object({
    title:Joi.string().min(3).required(),
    status:Joi.string().pattern(/^(active|inactive)$/).default('inactive'),
    image:Joi.string().empty(null,"").optional().default(null),
    parentId:Joi.string().allow(null,"").default(null),
    section: Joi.string().valid('Men\'s Fashion', 'Women\'s Fashion', 'Kids\' Fashion', 'Electronics', 'Miscellanous').required() 
})



module.exports={
   CategoryCreateDTO,
   CategoryUpdateDTO
}


