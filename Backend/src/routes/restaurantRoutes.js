const express = require("express");
const router = express.Router();
const { getRestaurants, getMenuByRestaurant, createReview, getReviewsByRestaurant } = require("../controllers/restaurantController");
const protect = require('../middleware/authMiddleware');

// Route to fetch all restaurants
router.get("/", getRestaurants);

// Route to fetch menu items of a specific restaurant
router.get("/:restaurantId/menu", getMenuByRestaurant);

router.post("/:restaurantId/review", protect, createReview);

router.get("/:restaurantId/reviews", getReviewsByRestaurant);


module.exports = router;
