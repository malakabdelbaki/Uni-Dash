const mongoose = require("mongoose");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await Promise.all([
      User.init(),
      Restaurant.init(),
      Order.init(),
      MenuItem.init(),
      Cart.init(),
      CartItem.init(),
    ]);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
