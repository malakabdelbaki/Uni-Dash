const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { placeOrder } = require("../controllers/orderController");
const protect = require('../middleware/authMiddleware');

router.get("/countdown/:orderId", orderController.getOrderCountdown);

router.post("/", protect, placeOrder);

module.exports = router;

module.exports = router;