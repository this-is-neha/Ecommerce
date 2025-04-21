
const Joi = require("joi");

// Image upload validation schema with orderId
const imageUploadSchema = Joi.object({
  orderId: Joi.string().required(), // Add orderId field
  images: Joi.array().items(Joi.string()),// Validate array of image filenames
});

module.exports = imageUploadSchema;
