const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");




exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

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
    const { restaurantId } = req.params;
    console.log("Restaurant ID:", restaurantId);
    const menuItems = await MenuItem.find({ restaurantId: restaurantId });
    
    if (!menuItems.length) {
      return res.status(404).json({ message: "No menu items found for this restaurant" });
    }

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve menu", error });
  }
};

exports.createReview = async (req, res) => {
  try{
    const user = req.user.id;
    const { restaurantId } = req.params;
    const { rating, comment, menuItem, order } = req.body;
    if (!order) {
       res.status(401).json({ message: "Order is required", error });
    }
    const review = new Review({
      user: user,
      menuItem: menuItem,
      order: order,
      rating: rating,
      comment: comment,
    });
    await review.save();
    
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    restaurant.reviews.push(review._id);
    await restaurant.save();
    res.status(201).json({ message: "Review created successfully", review });
  }
  catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Failed to create review", error });
  }
}

exports.getReviewsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const reviewIdList = restaurant.reviews.map((reviewId) => reviewId.toString());
    console.log("Review ID List:", reviewIdList);
    const reviews = await Review.find({ _id: { $in: reviewIdList } })
      .populate("menuItem", "name")
      .populate("user", "name")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalReviews = await Review.countDocuments({ _id: { $in: reviewIdList } });
      console.log("Reviews:", reviews);
    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this restaurant" });
    }


    res.status(200).json({
      reviews,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews", error });
  }
};

exports.getReviewsByRestaurantByProduct = async (req, res) => {
  try {
    const { restaurantId, menuItemId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const reviewIdList = restaurant.reviews.map((reviewId) => reviewId.toString());
    const filteredReviewIdList = await Review.find({ _id: { $in: reviewIdList }, menuItem: menuItemId }).select("_id");
    const filteredReviewIds = filteredReviewIdList.map((review) => review._id.toString());
    const totalReviews = await Review.countDocuments({ _id: { $in: filteredReviewIds } });
    const reviews = await Review.find({ _id: { $in: reviewIdList } })
      .populate("menuItem", "name")
      .populate("user", "name")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this restaurant and menu item" });
    }

    res.status(200).json({
      reviews,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews", error });
  }
};