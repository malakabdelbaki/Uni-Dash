const mongoose = require("mongoose");
const User = require("./User");
const CartItem = require("./CartItem");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    itemsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true },
);

cartSchema.index({ userId: 1 }); 

module.exports = mongoose.model("Cart", cartSchema);
