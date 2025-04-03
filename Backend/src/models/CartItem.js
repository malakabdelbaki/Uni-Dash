const mongoose = require("mongoose");
const Cart = require("./Cart");
const MenuItem = require("./MenuItem");

const cartItemSchema = new mongoose.Schema(
  {
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true },
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

cartItemSchema.index({ cartId: 1, menuItemId: 1 }); 

module.exports = mongoose.model("CartItem", cartItemSchema);
