const mongoose = require("mongoose");
const OrderStatus = require("../enums/orderStatus"); 
const User = require("./User");
const Restaurant = require("./Restaurant");
const MenuItem = require("./MenuItem");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Customer
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    }, 
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1, status: 1 }); 
orderSchema.index({ restaurantId: 1, status: 1 });
orderSchema.index({ restaurantId: 1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model("Order", orderSchema);
