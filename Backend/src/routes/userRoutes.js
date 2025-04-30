const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserById, verifyResetToken } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
// Protected Route: to test the cookies
router.get("/profile", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
// Move the :id route to the end to prevent it from catching other routes
router.get('/:id', getUserById);

module.exports = router;
