const express = require("express");
const router = express.Router();
const { getRestaurants, getMenuByRestaurant } = require("../controllers/restaurantController");

// Route to fetch all restaurants
router.get("/", getRestaurants);

// Route to fetch menu items of a specific restaurant
router.get("/:restaurantId/menu", getMenuByRestaurant);

module.exports = router;
