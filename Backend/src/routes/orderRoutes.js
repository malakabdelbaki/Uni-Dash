const express = require("express");
const router = express.Router();

const {
  createOrder,
  getIncomingOrders,
  updateOrderStatus,
  getOrderCountdown,
  placeOrder,
  getUserOrders
} = require("../controllers/orderController");

const protect = require('../middleware/authMiddleware');


router.post("/createOrder", createOrder); 
router.get("/restaurant/:restaurantId", getIncomingOrders);
router.patch("/:orderId/status", updateOrderStatus); 
router.get("/countdown/:orderId", getOrderCountdown);
router.post("/", protect, placeOrder);
router.get('/user/:userId', getUserOrders);
module.exports = router;
