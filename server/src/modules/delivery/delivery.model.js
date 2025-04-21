const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },
    deliveryLabel: { type: String, default: 'HOME' },
    deliveryOption: { type: String, default: 'Standard' },

    createdAt: { type: Date, default: Date.now },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  
    
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true 
  },
});
module.exports = mongoose.model("Order", orderSchema);
