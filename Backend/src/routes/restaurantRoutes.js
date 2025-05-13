const express = require("express");
const router = express.Router();
const { getRestaurants, getMenuByRestaurant, createReview } = require("../controllers/restaurantController");

// Route to fetch all restaurants
router.get("/", getRestaurants);

// Route to fetch menu items of a specific restaurant
router.get("/:restaurantId/menu", getMenuByRestaurant);

router.post("/:restaurantId/review", createReview);

module.exports = router;
