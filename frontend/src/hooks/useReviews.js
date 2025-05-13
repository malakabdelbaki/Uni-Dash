"use client"

import { useState, useEffect } from "react"
import {getReviewsByRestaurant} from "../api/reviewApi"

export const useReviews = (restaurantId, limit = 5) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [overallRating, setOverallRating] = useState(null)
  const [totalVotes, setTotalVotes] = useState(null)

  const fetchReviews = async (pageNum) => {
  if (!restaurantId) return;

  try {
    setLoading(true);
    setError(null);
    console.log("Fetching reviews for restaurant in hook:", restaurantId);

    const response = await getReviewsByRestaurant(restaurantId, pageNum, limit);

    const { reviews, currentPage, totalPages, totalRatings, totalReviews, averageRating } = response.data;
    
    if (pageNum === 1) {
      setReviews(reviews);
    } else {
      setReviews((prevReviews) => [...prevReviews, ...reviews]);
    }

    setHasMore(currentPage < totalPages);
    setOverallRating(averageRating ?? null);
    setTotalVotes(totalRatings ?? null); 

    setPage(currentPage);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchReviews(1)
  }, [restaurantId])

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchReviews(page + 1)
    }
  }

  return {
    reviews,
    loading,
    error,
    hasMore,
    loadMore,
    overallRating,
    totalVotes,
  }
}
