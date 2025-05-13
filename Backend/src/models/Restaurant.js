const mongoose = require("mongoose");
const User = require("./User");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    phone: { type: String },
    description: { type: String },
    image: { type: String },
    isOpen: { type: Boolean, default: true },
    reviews: { type: [mongoose.Schema.Types.ObjectId], ref: "Review" }    
  },
  { timestamps: true }
);

restaurantSchema.index({ name: 1 });
module.exports = mongoose.model("Restaurant", restaurantSchema);
