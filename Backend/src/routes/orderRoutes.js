const express = require("express");
const router = express.Router();
const {
  createOrder,
  getIncomingOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { placeOrder } = require("../controllers/orderController");
const protect = require('../middleware/authMiddleware');


router.post("/", createOrder); 
router.get("/restaurant/:restaurantId", getIncomingOrders);
router.patch("/:orderId/status", updateOrderStatus); 
router.post("/", protect, placeOrder);


module.exports = router;
