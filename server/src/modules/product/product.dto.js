


const Joi = require("joi");

const ProductCreateDTO = Joi.object({
    title: Joi.string().min(3).required(),
    summary: Joi.string().required(),
    description: Joi.string().allow(null, "").optional().default(null),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(90).default(0),
    categoryId: Joi.string().required(),// This should be an array of strings
    brandId: Joi.string().required(),
    slug: Joi.string().required(),
    isFeatured: Joi.boolean().default(false),
    status: Joi.string().valid('active', 'inactive').default('inactive'),
    images: Joi.string()

});

const ProductUpdateDTO = Joi.object({
    title: Joi.string().min(3).required(),
    summary: Joi.string().required(),
    description: Joi.string().allow(null, "").optional().default(null),
    price: Joi.number().min(100).required(),
    discount: Joi.number().min(0).max(90).default(0),
    categoryId: Joi.string().required(),// // This should be an array of strings
    brandId: Joi.string().required(),
    slug: Joi.string().required(),
    isFeatured: Joi.boolean().default(false),
    status: Joi.string().valid('active', 'inactive').default('inactive'), 
    images: Joi.string()

});

module.exports = {
    ProductCreateDTO,
    ProductUpdateDTO
};



  // images: Joi.array().items(Joi.string().allow(null, '')).allow(null, '').default(null).optional()