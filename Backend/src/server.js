const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//const connectDB = require("./config/db");
const mongoose = require("mongoose");



dotenv.config();
require("dotenv").config({ path: "./.env" });

console.log("MONGO_URI from .env:", process.env.MONGO_URI); // Debugging log


// Database connection function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Timeout after 30 seconds
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    process.exit(1); // Exit if connection fails
  }
};

// Call connectDB() before starting the server
(async () => {
  await connectDB();
})();

const app = express();

// CORS setup 
app.use(cors({
    origin: 'http://localhost:3000',  
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true,               
  }));
// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
//app.use("/api/orders", require("./routes/orderRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

