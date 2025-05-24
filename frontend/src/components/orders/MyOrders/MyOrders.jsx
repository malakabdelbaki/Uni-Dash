import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useAuth } from "../../../hooks/useAuth";
import { addReview, fetchRestaurantById } from "../../../api/restaurantApi";
import Header from "../../Header";
import "./style.css";
import ReviewModal from "./ReviewModal";
import Toast from "./Toast";
import { isOrderReviewed, fetchUserOrders } from "../../../api/orderApi";




const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantNames, setRestaurantNames] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [currentOrderId, setCurrentOrderId] = useState(null)
  const [toast, setToast] = useState(null) // Changed to store both message and type
  const [reviewStatus, setReviewStatus] = useState({});


  // Format date to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format time to a more readable format
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Truncate text if it's too long
  const truncateText = (text, maxLength = 15) => {
    if (!text) return "N/A";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Fetch restaurant names for all orders
  const fetchRestaurantNames = async (orders) => {
    const names = {};
    for (const order of orders) {
      if (order.restaurantId && !restaurantNames[order.restaurantId]) {
        try {
          const restaurant = await fetchRestaurantById(order.restaurantId);
          if (restaurant) {
            names[order.restaurantId] = restaurant.name;
          }
        } catch (error) {
          console.error(`Error fetching restaurant name for ID ${order.restaurantId}:`, error);
          names[order.restaurantId] = "Unknown Restaurant";
        }
      }
    }
    setRestaurantNames(prev => ({ ...prev, ...names }));
  };
  
  const checkIfOrdersReviewed = async (ordersToCheck = orders) => {
  const statusMap = {};
  console.log("Checking review status for orders:", ordersToCheck);
  for (const order of ordersToCheck) {
    try {
      const response = await isOrderReviewed(order._id);
      console.log("--------------------------"+response);
      statusMap[order._id] = response.data.reviewed;
      console.log(`Order ${order._id} reviewed status:`, statusMap[order._id]);
    } catch (error) {
      console.error(`Failed to check review status for order ${order._id}`, error);
      statusMap[order._id] = false;
    }
  }
  setReviewStatus(statusMap);
};

  useEffect(() => {
    console.log("useEffect triggered in MyOrders, user:", user);
    
    if (user && user._id) {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          console.log("Fetching orders for user:", user._id);
          const ordersData = await fetchUserOrders(user._id);
          setOrders(ordersData);
          await fetchRestaurantNames(ordersData);
          await checkIfOrdersReviewed(ordersData);
          setError(null);
        } catch (error) {
          console.error("Error fetching orders:", error);
          if (error.response?.status === 404) {
            setOrders([]);
          } else {
            setError("Failed to fetch orders. Please try again later.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      console.log("No user found or user._id is missing, skipping fetch");
      setLoading(false);
    }
  }, [user]);




 const openReviewModal = (orderId) => {
    setCurrentOrderId(orderId)
    setShowReviewModal(true)
  }

  const closeReviewModal = () => {
    setShowReviewModal(false)
    setCurrentOrderId(null)
  }

  const handleSubmitReview = async (orderId, rating, reviewText) => {
    try {
      const order = orders.find((order) => order._id === orderId);
      await addReview(order.restaurantId,{
        order: orderId,
        rating,
        comment: reviewText,
      })

      // Update the order to mark it as reviewed
      const updatedOrders = orders.map((order) => (order._id === orderId ? { ...order, reviewed: true } : order))
      setOrders(updatedOrders)
      setReviewStatus(prev => ({ ...prev, [orderId]: true }));

      closeReviewModal()
      setToast({ message: "Review submitted successfully!", type: "success" })
    } catch (error) {
      console.error("Error submitting review:", error)
      setToast({ message: "Failed to submit review. Please try again.", type: "error" })
    }
  }
  useEffect(() => {
  console.log("Updated reviewStatus:", reviewStatus);
}, [reviewStatus]);

  
  const clearToast = () => {
    setToast(null)
  }

  return (
    <div className="unidash-container">
      <Header />
      <main className="orders-content">
        <h2 className="page-title">My Orders</h2>

        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading orders...</div>
        ) : (
          <div className="orders-table">
            <div className="table-header">
              <div className="header-cell">ORDER ID</div>
              <div className="header-cell">RESTAURANT</div>
              <div className="header-cell">DATE</div>
              <div className="header-cell">TIME</div>
              <div className="header-cell">STATUS</div>
              <div className="header-cell">TIME LEFT</div>
              <div className="header-cell">TOTAL</div>
              <div className="header-cell">REVIEW</div>
            </div>

            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order._id} className="table-row">
                  <div className="cell" title={order._id}>
                    {order._id}
                  </div>
                  <div className="cell" title={restaurantNames[order.restaurantId] || "Loading..."}>
                    {truncateText(restaurantNames[order.restaurantId] || "Loading...")}
                  </div>
                  <div className="cell">{formatDate(order.createdAt)}</div>
                  <div className="cell">{formatTime(order.createdAt)}</div>
                  <div className={`cell status ${order.status?.toLowerCase() || 'pending'}`}>
                    {order.status || "Pending"}
                  </div>
                  <div className="cell">
                    {order.estimatedPrepTime ? `${order.estimatedPrepTime} min` : "N/A"}
                  </div>
                  <div className="cell">${order.totalAmount?.toFixed(2) || "0.00"}</div>
                   <div className="cell">
                  {order.status === "Completed" && reviewStatus[order._id] === false ? (
  <button className="leave-review-btn" onClick={() => openReviewModal(order._id)}>
    Leave review
  </button>
) : reviewStatus[order._id] ? (
  <span className="reviewed-label">Reviewed</span>
) : (
  <button className="leave-review-btn" disabled>
    Leave review
  </button>
)}

                  </div>
                </div>
              ))
            ) : (
              <div className="no-orders">No orders available.</div>
            )}
          </div>
        )}
      </main>
      <ReviewModal
        isOpen={showReviewModal}
        onClose={closeReviewModal}
        onSubmit={handleSubmitReview}
        orderId={currentOrderId}
      />
      <div className="cart-button">
        <div className="cart-count">2</div>
        <div className="cart-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
            <path d="M20 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
      </div>
  {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}    </div>
  );
};

export default MyOrders; 