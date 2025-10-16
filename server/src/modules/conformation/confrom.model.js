const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  refId: {
    type: String, // eSewa reference ID
    default: null,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("payment", OrderSchema);

module.exports = Order;
