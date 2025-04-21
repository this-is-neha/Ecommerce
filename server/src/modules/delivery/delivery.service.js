const Order = require('./delivery.model');

class OrderService {
  
  async createOrder(orderDTO) {
    const order = new Order(orderDTO);
    return await order.save(); 
  }
  
  async getOrders() {
    return await Order.find();
  }
  async getOrderById(orderId) {
    return await Order.findById(orderId);
  }
  async deleteOrder(orderId) {
    return await Order.findByIdAndDelete(orderId);
  }
  async getOrdersByUserId(userId) {
    const query = user ? { user } : {};  // If a user is passed, filter by user, else fetch all orders
    return Order.find(query);  
  
}
}

module.exports = new OrderService();