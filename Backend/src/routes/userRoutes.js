const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected Route: to test the cookies
router.get("/profile", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
