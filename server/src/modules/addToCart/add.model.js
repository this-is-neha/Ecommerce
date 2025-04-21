
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const cartItemSchema = new Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   },
//   title: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, default: 1 },
//   images: [String],
//   discount: { type: Number, default: 0 },
//   description: String,
//   summary: String,
// });

// const cartSchema = new Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   items: [cartItemSchema],
// });

// module.exports = mongoose.model('Cart', cartSchema);



const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
