const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

//router.post("/confirm/:orderId", orderController.confirmOrder);
router.get("/countdown/:orderId", orderController.getOrderCountdown);

module.exports = router;