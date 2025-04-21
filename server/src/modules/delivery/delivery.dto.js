

const Joi = require("joi");


const OrderCreateDTO = Joi.object({
  user: Joi.string(), // Ensure user is required
  productId: Joi.string().required(),
  fullName: Joi.string().min(3).required(),
  phoneNumber: Joi.string().pattern(/^\+?\d{10,15}$/).required(),
  region: Joi.string().min(2).required(),
  city: Joi.string().min(2).required(),
  area: Joi.string().min(2).required(),
  address: Joi.string().min(5).required(),
  deliveryLabel: Joi.string().valid("HOME", "OFFICE").default("HOME"),
  deliveryOption: Joi.string().valid("Express", "Standard").default("Standard"),
});

const OrderUpdateDTO = Joi.object({
  productId: Joi.string(),
  fullName: Joi.string().min(3).required(),
  phoneNumber: Joi.string().pattern(/^\+?\d{10,15}$/).required(),
  region: Joi.string().min(2).required(),
  city: Joi.string().min(2).required(),
  area: Joi.string().min(2).required(),
  address: Joi.string().min(5).required(),
  deliveryLabel: Joi.string().valid("HOME", "OFFICE").default("HOME"),
  deliveryOption: Joi.string().valid("Express", "Standard").default("Standard"),
});

module.exports = {
  OrderCreateDTO,
  OrderUpdateDTO,
};
