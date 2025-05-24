const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserById, getRestaurantById, deleteUserById, deleteRestaurantById } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Get current user data
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Route: to test the cookies
router.get("/profile", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

router.get('/:id', getUserById);
router.get('/restaurant/:id', getRestaurantById);

router.delete('/:id', deleteUserById);
router.delete('/restaurant/:id', deleteRestaurantById);

module.exports = router;
