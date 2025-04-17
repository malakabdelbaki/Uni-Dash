const express = require("express");
const router = express.Router();

const {
  createOrder,
  getIncomingOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

router.post("/", createOrder); 
router.get("/restaurant/:restaurantId", getIncomingOrders);
router.patch("/:orderId/status", updateOrderStatus); 

module.exports = router;
