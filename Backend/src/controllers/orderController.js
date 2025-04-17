
const Order = require("../models/Order");

// exports.confirmOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { estimatedPrepTime } = req.body; // e.g. 20 (minutes)

//     const order = await Order.findById(orderId);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     order.status = "CONFIRMED";
//     order.confirmedAt = new Date();
//     order.estimatedPrepTime = estimatedPrepTime;

//     await order.save();

//     res.status(200).json({ message: "Order confirmed", order });
//   } catch (error) {
//     console.error("Error confirming order:", error);
//     res.status(500).json({ message: "Failed to confirm order", error });
//   }
// };

// Get the countdown for a confirmed order
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