const Cart = require('./add.model'); // Assuming Cart is the Mongoose model

class CartService {
  // Add product to cart
  async addToCart({ userId, productId, quantity }) {
    try {
      // Find the cart for the user
      let cart = await Cart.findOne({ userId });

      // If no cart exists for the user, create a new cart
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      // Check if the product is already in the cart
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

      if (itemIndex > -1) {
        // Product exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product does not exist in the cart, add new item
        cart.items.push({ productId, quantity });
      }

      // Save the updated cart
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      throw new Error('Error adding product to cart');
    }
  }

  // View cart for a user
  async viewCart(userId) {
    try {
      const cart = await Cart.findOne({ userId }).populate('items.productId'); // Populating product details (optional)
      if (!cart) {
        return { items: [] }; // Return an empty cart if no cart exists
      }
      return cart;
    } catch (error) {
      throw new Error('Error viewing cart');
    }
  }

  // Update quantity of a product in the cart
  async updateCartItem(userId, productId, quantity) {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        throw new Error('Cart not found');
      }

      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
      if (itemIndex === -1) {
        throw new Error('Product not found in cart');
      }

      cart.items[itemIndex].quantity = quantity; // Update the quantity
      const updatedCart = await cart.save();

      return updatedCart;
    } catch (error) {
      throw new Error('Error updating cart item');
    }
  }

  // Remove a product from the cart
  async removeCartItem(userId, productId) {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        throw new Error('Cart not found');
      }

      // Filter out the product from the cart
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      throw new Error('Error removing cart item');
    }
  }

  // Clear the entire cart for a user
  async clearCart(userId) {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        throw new Error('Cart not found');
      }

      cart.items = []; // Clear all items in the cart

      const clearedCart = await cart.save();
      return clearedCart;
    } catch (error) {
      throw new Error('Error clearing cart');
    }
  }
}

const cartSvc = new CartService();
module.exports = cartSvc;
