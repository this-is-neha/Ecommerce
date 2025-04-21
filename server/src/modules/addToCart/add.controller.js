const Cart = require('./add.model');

// Function to add a product to the cart
class CartController{
 addToCart = async (req, res) => {
    const { productId } = req.body; 
    const { userId } = req.params; 
  
    try {
        let cart = await Cart.findOne({ userId });
  
        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }
  
        // Check if the product already exists in the cart
        const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
  
        if (existingProductIndex > -1) {
            // If the product exists, increase the quantity
            cart.products[existingProductIndex].quantity += 1;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.products.push({ productId, quantity: 1 });
        }
  
        // Save the cart
        await cart.save();
  
        return res.status(200).json({ message: 'Product added to cart successfully!', cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Function to get all items in the cart
getCartItems = async (req, res) => {
    const { userId } = req.params;

    if (!userId || userId === 'null') { // Check for null or 'null'
        return res.status(400).json({ message: 'Valid user ID is required.' });
    }

    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        // Return the products in the cart
        return res.status(200).json({ message: 'Cart retrieved successfully!', products: cart.products });
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};




removeFromCart = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
      // Find the cart for the user
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found.' });
      }

      // Filter out the product to be removed
      cart.products = cart.products.filter(item => item.productId.toString() !== productId);

      // Save the updated cart
      await cart.save();

      return res.status(200).json({ message: 'Product removed from cart successfully!', cart });
    } catch (error) {
      console.error('Error removing product from cart:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };

}

const cartCtrl = new CartController()
module.exports = cartCtrl
