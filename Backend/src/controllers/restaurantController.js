const Restaurant = require("../models/Restaurant");




exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    console.log("Fetched Restaurants from DB:", restaurants); // Debugging log

    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Failed to retrieve restaurants", error });
  }
};



const MenuItem = require("../models/MenuItem");

exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = String(req.params.restaurantId);
    console.log('Restaurant ID:', restaurantId); // Debugging line

    const menuItems = await MenuItem.find({ restaurant: restaurantId });

    console.log("Fetched Menu Items from DB:", menuItems); // Debugging log

    if (!menuItems.length) {
      return res.status(404).json({ message: "No menu items found for this restaurant" });
    }

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve menu", error });
  }
};
