const mongoose = require("mongoose");
const Cart = require("./Cart");
const MenuItem = require("./MenuItem");

const cartItemSchema = new mongoose.Schema(
  {
    cart: { type: mongoose.Schema.Types.ObjectId, ref: Cart, required: true },
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: MenuItem, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
