import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useAuth } from "../../../hooks/useAuth";
import { fetchRestaurantById } from "../../../api/restaurantApi";
import Header from "../../Header";
import "../IncomingOrders/style.css";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantNames, setRestaurantNames] = useState({});



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

  useEffect(() => {
    console.log("useEffect triggered in MyOrders, user:", user);
    
    if (user && user.id) {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          console.log("Fetching orders for user:", user.id);
          const response = await axiosInstance.get(`/orders/user/${user.id}`);
          console.log("Orders response:", response.data);
          setOrders(response.data);
          await fetchRestaurantNames(response.data);
          setError(null);
        } catch (error) {
          console.error("Error fetching orders:", error);
          if(error.response.status !== 404 && error.response.data?.message !== "No orders found for this user.")
          setError("Failed to fetch orders. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      console.log("No user found or user.id is missing, skipping fetch");
      setLoading(false);
    }
  }, [user]);

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
            </div>

            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order._id} className="table-row">
                  <div className="cell" title={order._id}>{truncateText(order._id, 8)}</div>
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
                </div>
              ))
            ) : (
              <div className="no-orders">No orders available.</div>
            )}
          </div>
        )}
      </main>
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
    </div>
  );
};

export default MyOrders; 