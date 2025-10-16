const Joi = require("joi");

// Payment/order validation schema
const paymentSchema = Joi.object({
  amount: Joi.number().positive().required(),       // Amount must be positive and required
  buyerName: Joi.string().min(2).max(100).required(), // Name required, 2-100 chars
  accountNumber: Joi.string().min(6).max(30).required(), // Bank account number required
  email: Joi.string().email().optional(),          // Optional email
  mobile: Joi.string().pattern(/^[0-9]{10}$/).optional(), // Optional 10-digit mobile
  pid: Joi.string().optional(),                     // Optional: Order ID from frontend/backend
  refId: Joi.string().optional(),                   // Optional: eSewa refId after payment
});

module.exports = paymentSchema;
