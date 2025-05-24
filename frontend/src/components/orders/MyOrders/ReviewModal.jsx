import { useState } from "react"
import { Star } from 'lucide-react'

const ReviewModal = ({ isOpen, onClose, onSubmit, orderId }) => {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")

  const handleRatingChange = (newRating) => {
    setRating(newRating)
  }

  const handleSubmit = () => {
    onSubmit(orderId, rating, reviewText)
    setRating(0)
    setReviewText("")
  }

  if (!isOpen) return null

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <button className="close-modal" onClick={onClose}>
          ×
        </button>
        <h3>Rate your Order!</h3>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`star ${rating >= star ? "filled" : ""}`}
              onClick={() => handleRatingChange(star)}
              fill={rating >= star ? "#E6A817" : "none"}
              stroke={rating >= star ? "#E6A817" : "currentColor"}
            />
          ))}
        </div>
        <div className="review-form">
          <label>How was your experience?</label>
          <textarea
            placeholder="Leave a comment (optional)..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button className="submit-review-btn" onClick={handleSubmit} disabled={rating === 0}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
