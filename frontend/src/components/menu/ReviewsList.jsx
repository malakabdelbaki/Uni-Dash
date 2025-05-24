"use client"

import { useRef, useEffect, useState } from "react"
import { useReviews } from "../../hooks/useReviews"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import "./Reviews.css"
import { formatDistanceToNow } from "date-fns"
import axiosInstance from "../../api/axiosInstance"
import { isAlreadyDisliked, isAlreadyLiked, likeReview, dislikeReview } from "../../api/reviewApi"

const StarRating = ({ rating }) => {
  const safeRating = typeof rating === "number" ? rating : 0

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${
            star <= Math.round(safeRating) ? "filled" : star - 0.5 <= safeRating ? "half" : ""
          }`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

const ReviewItem = ({ review }) => {
  const [likes, setLikes] = useState(review.Likes.length)
  const [dislikes, setDislikes] = useState(review.Dislikes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

   const handleReaction = async (type) => {
    try {
      console.log("Handling reaction:", type)
      console.log("Review ID:", review._id)
      const response = type === "like" ? await likeReview(review._id) : await dislikeReview(review._id)
      console.log("Response from reaction:", response)
      const Dislikes = response.review.Dislikes;
      const Likes = response.review.Likes;
      type === "like" ? setIsLiked(true) : setIsDisliked(true)
      
      setLikes(Likes.length)
      setDislikes(Dislikes.length)
    } catch (error) {
      console.error("Failed to react to review:", error)
    }
  }

    useEffect(() => {
      console.log("ReviewItem component rendered");
    
    const checkReactionStatus = async () => {
      try {
        const [likedRes, dislikedRes] = await Promise.all([
          isAlreadyLiked(review._id),
          isAlreadyDisliked(review._id),
        ])

        console.log("Liked response:", likedRes)
        console.log("Disliked response:", dislikedRes)
        setIsLiked(likedRes.alreadyLiked)
        setIsDisliked(dislikedRes.alreadyDisliked)
      } catch (err) {
        console.error("Error checking reaction status", err)
      }
    }
   checkReactionStatus()
});
  
  

  return (
    <div className="review-item">
      <div className="review-header">
        <div className="reviewer-info">
          <h4>{review.user.name}</h4>
          <div className="rating-date">
            <StarRating rating={review.rating} />
            <span className="review-date">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
      <p className="review-text">{review.comment}</p>
      <div className="review-actions">
      <button
      className="review-action-btn"
      onClick={() => handleReaction("like")}
      disabled={isLiked}
      title={isLiked ? "Already liked" : "Like this review"}
    >
      <ThumbsUp size={16} />
      <span>{likes}</span>
    </button>

    <button
      className="review-action-btn"
      onClick={() => handleReaction("dislike")}
      disabled={isDisliked}
      title={isDisliked ? "Already disliked" : "Dislike this review"}
    >
      <ThumbsDown size={16} />
      <span>{dislikes}</span>
    </button>
</div>
    </div>
  )
}

const ReviewsList = ({ restaurantId }) => {
  const { reviews, loading, error, hasMore, loadMore, overallRating, totalVotes } = useReviews(restaurantId)

  const observerTarget = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore()
        }
      },
      { threshold: 1.0 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [hasMore, loadMore])

  if (error) {
    return <div className="error">Error loading reviews: {error}</div>
  }

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2>Reviews</h2>
        <div className="overall-rating">
<div className="rating-value">
  {overallRating != null ? overallRating.toFixed(1) : "N/A"}
</div>
          <div className="rating-stars">
            <StarRating rating={overallRating} />
            <span className="votes-count">{totalVotes} votes</span>
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review, index) => <ReviewItem key={review._id || index} review={review} />)
        ) : !loading ? (
          <div className="no-reviews">No reviews yet.</div>
        ) : null}

        {loading && <div className="loading-reviews">Loading reviews...</div>}

        {hasMore && !loading && <div ref={observerTarget} className="load-more-trigger"></div>}
      </div>
    </div>
  )
}

export default ReviewsList
