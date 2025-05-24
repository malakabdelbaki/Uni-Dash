const express = require("express");
const router = express.Router();
const { likeReview, isAlreadyLiked, dislikeReview, isAlreadyDisliked } = require("../controllers/reviewController");
const protect = require('../middleware/authMiddleware');

router.post("/like/:reviewId", protect, likeReview);
router.post("/dislike/:reviewId", protect, dislikeReview);
router.get("/like/:reviewId", protect, isAlreadyLiked);
router.get("/dislike/:reviewId",protect, isAlreadyDisliked);
module.exports = router;
