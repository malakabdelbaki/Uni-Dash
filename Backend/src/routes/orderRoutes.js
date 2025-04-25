const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const protect = require('../middleware/authMiddleware');
const {
  createOrder,
  getIncomingOrders,
  updateOrderStatus,
  getOrderCountdown,
  placeOrder,
} = require("../controllers/orderController");


router.post("/createOrder", createOrder); 
router.get("/restaurant/:restaurantId", getIncomingOrders);
router.patch("/:orderId/status", updateOrderStatus); 
router.get("/countdown/:orderId", orderController.getOrderCountdown);
router.post("/", protect, placeOrder);
module.exports = router;
