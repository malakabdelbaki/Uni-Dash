const Review = require("../models/Review");
const mongoose = require("mongoose");

exports.likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findOne({_id: reviewId });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    const userId = new mongoose.Types.ObjectId(req.user.id);
    review.Likes.push(userId);

    await review.save();
    res.status(200).json({ message: "Review liked successfully", review });
  }catch (error) {
    console.error("Error liking review:", error);
    res.status(500).json({ message: "Server error" });
    }
}

exports.isAlreadyLiked = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    
    const review = await Review.findById(new mongoose.Types.ObjectId(reviewId));
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (!review.Likes) {
      return res.status(200).json({ alreadyLiked: false });
    }
    const alreadyLiked = review.Likes.includes(userId);
    res.status(200).json({ alreadyLiked });
  } catch (error) {
    console.error("Error checking like status:", error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.dislikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;
    console.log("Dislike User ID:", userId); // Debugging log
    console.log("Dislike Review ID:", reviewId); // Debugging log

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(200).json({ message: "Review not found" });
    }    
   
    review.Dislikes.push(userId);
    await review.save();
    res.status(200).json({ message: "Review disliked successfully", review });
  } catch (error) {
    console.error("Error disliking review:", error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.isAlreadyDisliked = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(new mongoose.Types.ObjectId(reviewId));
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (!review.Dislikes) {
      return res.status(200).json({ alreadyDisliked: false });
    }
    // Check if the user has already disliked the review
    const alreadyDisliked = review.Dislikes.includes(userId);
    res.status(200).json({ alreadyDisliked });
  } catch (error) {
    console.error("Error checking dislike status:", error);
    res.status(500).json({ message: "Server error" });
  } 
}
