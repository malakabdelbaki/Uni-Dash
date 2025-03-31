const mongoose = require("mongoose");
const Restaurant = require("./Restaurant"); 

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: Restaurant, required: true }, 
    image: { type: String }, 
    category: { type: String }, 
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
