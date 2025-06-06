const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant")
const sendEmail = require("../utils/sendEmail");

// Generate Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role, phone });

    const token = generateToken(user._id, user.role);

    // Create a plain object with the user data we want to send
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    };

    res.cookie("token", token, { httpOnly: true }).status(201).json({ 
      message: "User registered successfully",
      token,
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    // Create a plain object with the user data we want to send
    const userResponse = {
      id: user._id.toString(), // Convert ObjectId to string
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    };

    res.cookie("token", token, { httpOnly: true }).json({
      message: "Login successful",
      token,
      user: userResponse
    });
  } catch (error) {
    console.error("Login error:", error); // Add error logging
    res.status(500).json({ message: "An error occurred during login" });
  }
};


const logoutUser = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create a reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Add token to the URL - point to frontend route
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/forgot-password/${resetToken}`;

    const message = `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    `;

    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({ message: "Reset email sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send reset email." });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: "Password has been reset." });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).lean(); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findById(restaurantId).lean(); 
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserById, getRestaurantById, deleteUserById, deleteRestaurantById };
