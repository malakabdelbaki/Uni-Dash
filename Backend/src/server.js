const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS setup 
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true, // allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
