const Order = require("../models/Order");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const MenuItem = require("../models/MenuItem");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("User ID:", userId); // Debugging log
    // Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate("itemsIds");
    if (!cart || cart.itemsIds.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let items = [];
    let totalAmount = 0;
    let restaurantId = null;

    // Build order items and calculate total
    for (const cartItem of cart.itemsIds) {
      const menuItem = await MenuItem.findById(cartItem.menuItemId);
      if (!menuItem) continue;

      // Ensure all items are from the same restaurant
      if (!restaurantId) restaurantId = menuItem.restaurantId.toString();
      if (menuItem.restaurantId.toString() !== restaurantId) {
        return res.status(400).json({ message: "All items must be from the same restaurant" });
      }

      items.push({
        menuItem: menuItem._id,
        quantity: cartItem.quantity,
      });

      totalAmount += menuItem.price * cartItem.quantity;
    }

    const order = new Order({
      userId,
      restaurantId,
      items,
      totalAmount,
    });

    const savedOrder = await order.save();

    // Clear cart after placing order (optional)
    await CartItem.deleteMany({ _id: { $in: cart.itemsIds } });
    cart.itemsIds = [];
    await cart.save();

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Place order error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
