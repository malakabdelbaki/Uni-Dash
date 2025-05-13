const express = require("express");
const router = express.Router();
const { getRestaurants, getMenuByRestaurant, createReview, getReviewsByRestaurant, getReviewsByRestaurantByProduct } = require("../controllers/restaurantController");

// Route to fetch all restaurants
router.get("/", getRestaurants);

// Route to fetch menu items of a specific restaurant
router.get("/:restaurantId/menu", getMenuByRestaurant);

router.post("/:restaurantId/review", createReview);

router.get("/:restaurantId/review", getReviewsByRestaurant);

router.get("/:restaurantId/review/:productId", getReviewsByRestaurantByProduct);

module.exports = router;
