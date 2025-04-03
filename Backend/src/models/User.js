const mongoose = require("mongoose");
const CustomerType = require("../enums/customer");


const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please fill a valid email address"],
    },
    password: { type: String, required: true },
    role: { type: String, enum: CustomerType, default: CustomerType.STUDENT },
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
