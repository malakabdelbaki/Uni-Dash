const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const MenuItem = require('../models/MenuItem');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId, quantity } = req.body;

    // Validate menu item
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Get or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, itemsIds: [] });
    }

    // Check if item already in cart
    let cartItem = await CartItem.findOne({
      cartId: cart._id,
      menuItemId: menuItemId,
    });

    if (cartItem) {
      // Update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create new CartItem and link it to cart
      cartItem = await CartItem.create({
        cartId: cart._id,
        menuItemId,
        quantity,
      });
      cart.itemsIds.push(cartItem._id);
      await cart.save();
    }

    // Update total price of the cart
    await updateCartTotalPrice(cart);

    res.status(200).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItemId, action } = req.body; // `action` will be either 'decrease' or 'remove'

    // Validate input
    if (!cartItemId || !action) {
      return res.status(400).json({ message: 'Cart item ID and action are required' });
    }

    // Find user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find cart item
    const cartItem = await CartItem.findOne({ _id: cartItemId, cartId: cart._id });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (action === 'decrease') {
      // Decrease quantity by 1 if quantity is greater than 1
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        await cartItem.save();
      } else {
        return res.status(400).json({ message: 'Quantity is already 1, use remove to delete item' });
      }
    } else if (action === 'remove') {
      // If action is 'remove', remove item entirely from the cart
      cart.itemsIds = cart.itemsIds.filter(id => id.toString() !== cartItemId);
      await cart.save();
      await CartItem.deleteOne({ _id: cartItemId });
    } else {
      return res.status(400).json({ message: 'Invalid action. Use "decrease" or "remove".' });
    }

    // Update total price of the cart
    await updateCartTotalPrice(cart);

    res.status(200).json({ message: 'Item updated successfully', cartItem });
  } catch (error) {
    console.error('Remove from Cart Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.itemsIds.length === 0) {
      return res.status(200).json({ items: [], totalPrice: 0 });
    }

    // Populate cart items with menu item details
    const cartItems = await CartItem.find({ _id: { $in: cart.itemsIds } }).populate('menuItemId');

    // Format response
    const formattedItems = cartItems.map(item => ({
      cartItemId: item._id,
      quantity: item.quantity,
      menuItem: {
        id: item.menuItemId._id,
        name: item.menuItemId.name,
        price: item.menuItemId.price,
        image: item.menuItemId.image,
      }
    }));

    res.status(200).json({ items: formattedItems, totalPrice: cart.totalPrice });
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Helper function to update the total price of the cart
const updateCartTotalPrice = async (cart) => {
  const cartItems = await CartItem.find({ _id: { $in: cart.itemsIds } }).populate('menuItemId');
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.menuItemId.price * item.quantity;
  }, 0);

  cart.totalPrice = totalPrice;
  await cart.save();
};
