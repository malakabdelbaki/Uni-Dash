const Review = require("../models/Review");

exports.likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    // Check if the user has already liked the review
    const alreadyLiked = review.likes.includes(userId);
    if (alreadyLiked) {
      return res.status(400).json({ message: "You have already liked this review" });
    }
    // Add the user ID to the likes array
    review.likes.push(userId);
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

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    // Check if the user has already liked the review
    const alreadyLiked = review.likes.includes(userId);
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

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    // Check if the user has already disliked the review
    const alreadyDisliked = review.dislikes.includes(userId);
    if (alreadyDisliked) {
      return res.status(400).json({ message: "You have already disliked this review" });
    }
    // Add the user ID to the dislikes array
    review.dislikes.push(userId);
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

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    // Check if the user has already disliked the review
    const alreadyDisliked = review.dislikes.includes(userId);
    res.status(200).json({ alreadyDisliked });
  } catch (error) {
    console.error("Error checking dislike status:", error);
    res.status(500).json({ message: "Server error" });
  } 
}
