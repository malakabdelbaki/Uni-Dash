const express = require("express");
const router = express.Router();

const {
  createOrder,
  getIncomingOrders,
  updateOrderStatus,
  getOrderCountdown,
  placeOrder,
} = require("../controllers/orderController");

const protect = require('../middleware/authMiddleware');


router.post("/createOrder", createOrder); 
router.get("/restaurant/:restaurantId", getIncomingOrders);
router.patch("/:orderId/status", updateOrderStatus); 
router.get("/countdown/:orderId", getOrderCountdown);
router.post("/", protect, placeOrder);

module.exports = router;
