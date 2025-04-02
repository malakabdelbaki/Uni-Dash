const mongoose = require("mongoose");
const User = require("./User");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true }, 
    phone: { type: String },
    description: { type: String },
    image: { type: String },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
