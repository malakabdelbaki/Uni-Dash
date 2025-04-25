
const Order = require("../models/Order");
const OrderStatus = require("../enums/orderStatus");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const MenuItem = require("../models/MenuItem");

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error });
  }
};

const getIncomingOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      restaurantId: req.params.restaurantId,
    }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = Object.values(OrderStatus);
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values are: ${validStatuses.join(", ")}`,
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

module.exports = {
  createOrder,
  getIncomingOrders,
  updateOrderStatus,
};


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


