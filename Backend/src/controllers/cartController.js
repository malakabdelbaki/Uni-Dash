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

    res.status(200).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
