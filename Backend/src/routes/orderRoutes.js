const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/orderController");
const protect = require('../middleware/authMiddleware');
const orderController = require("../controllers/orderController");


router.post("/", protect, placeOrder);

module.exports = router;



router.get("/countdown/:orderId", orderController.getOrderCountdown);

module.exports = router;