const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserById, getRestaurantById, deleteUserById, deleteRestaurantById } = require("../controllers/userController");
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

router.get('/:id', getUserById);
router.get('/restaurant/:id', getRestaurantById);

router.delete('/:id', deleteUserById);
router.delete('/restaurant/:id', deleteRestaurantById);
module.exports = router;
