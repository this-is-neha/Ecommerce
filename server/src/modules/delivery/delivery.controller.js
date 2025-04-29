const OrderService = require('./delivery.service');
const OrderDTO = require('./delivery.dto');
const mongoose = require('mongoose');
require('express');
const Order = require('./delivery.model')
class OrderController {
  
  async createOrder(req, res) {
    try {
        console.log("Request Body:", req.body); // Log the incoming request body
        const { error, value } = OrderDTO.OrderCreateDTO.validate(req.body);

        if (error) {
            console.error("Validation Error:", error.details);
            return res.status(400).json({ message: "Invalid order data", error: error.details });
        }

        const newOrder = await OrderService.createOrder(value);
        console.log("New Order Created:", newOrder); 

     
        res.status(201).json({
          message: "Order placed successfully",
          data:{
            result: {
              orderId: newOrder._id,
              order: newOrder,
            },
          }
        });
        console.log("OrderId is ", newOrder._id);
    } 
    catch (error) {
        console.error("Error creating order:", error); 
        res.status(500).json({
            message: "Error placing order",
            error: error.message,
        });
    }
}


 
  
  
  async getOrders(req, res) {
    try {
      const orders = await OrderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching orders",
        error: error.message,
      });
    }
  }


  async getOrderById(req, res) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching order",
        error: error.message,
      });
    }
  }

  async getOrdersByUserId(req, res) {
    try {
      // Destructure userId from request params
      const { userid } = req.params;
      console.log("Request params:", req.params);
      console.log("UserID:", userid);
  
      // Check if the provided userId is a valid ObjectId
      if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
  
      // Fetch orders by userId
      const orders = await Order.find({ user: userid });  // Assuming `user` is the field in your schema
  
      console.log("Query result:", orders);
  
      // Check if orders exist
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this user" });
      }
  
      // Send the orders as the response
      res.status(200).json(orders);
    } catch (error) {
      // Handle error
      res.status(500).json({
        message: "Error fetching orders",
        error: error.message,
      });
    }
  }
  
  
  async deleteOrder(req, res) {
    try {
      const deletedOrder = await OrderService.deleteOrder(req.params.id);
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting order",
        error: error.message,
      });
    }
  }
}

module.exports = new OrderController();
