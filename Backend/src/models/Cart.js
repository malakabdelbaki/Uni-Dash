const mongoose = require("mongoose");
const User = require("./User");
const CartItem = require("./CartItem");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true }, 
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: CartItem }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
