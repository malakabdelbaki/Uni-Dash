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

const Order = require("../models/Order");


exports.getOrderCountdown = async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
  
      if (!order) return res.status(404).json({ message: "Order not found" });
      if (order.status !== "CONFIRMED" || !order.confirmedAt || !order.estimatedPrepTime)
        return res.status(400).json({ message: "Order is not yet confirmed" });
  
      const now = new Date();
      const endTime = new Date(order.confirmedAt.getTime() + order.estimatedPrepTime * 60000);
      const remainingMs = endTime - now;
      const remainingMin = Math.max(0, Math.ceil(remainingMs / 60000));
  
      res.status(200).json({
        remainingMinutes: remainingMin,
        estimatedReadyTime: endTime,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get countdown", error });
    }
  };