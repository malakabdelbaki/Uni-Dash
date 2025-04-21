const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/orderController");
const protect = require('../middleware/authMiddleware');

router.post("/", protect, placeOrder);

module.exports = router;
