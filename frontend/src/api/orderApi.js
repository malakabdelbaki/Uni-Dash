import axiosInstance from './axiosInstance';

export const OrderStatus = Object.freeze({
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
});

export async function fetchOrders(restaurantId) {
  try {
    const response = await axiosInstance.get(`/orders/restaurant/${restaurantId}`);
    const orders = response.data;

    const ordersWithUserNames = await Promise.all(
      orders.map(async (order) => {
        let userName = "Unknown";

        if (typeof order.userId === "string") {
          try {
            const userResponse = await axiosInstance.get(`/users/${order.userId}`);
            userName = userResponse.data.name || "Unknown";
          } catch (err) {
            console.error("Error fetching user:", err);
          }
        } else if (order.userId?.name) {
          userName = order.userId.name;
        }

        const createdAt = new Date(order.createdAt);
        const now = new Date();
        const expectedCompletionTime = new Date(createdAt.getTime() + 30 * 60 * 1000);
        const timeDiffMs = expectedCompletionTime - now;

        let timeLeft = "Completed";
        if (timeDiffMs > 0) {
          const minutes = Math.floor(timeDiffMs / (1000 * 60));
          const seconds = Math.floor((timeDiffMs % (1000 * 60)) / 1000);
          timeLeft = `${minutes}m ${seconds}s`;
        }

        const date = createdAt.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const time = createdAt.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          id: order._id.slice(-4),
          fullId: order._id,
          customer: userName,
          date,
          time,
          status: order.status,
          timeLeft,
          total: order.totalAmount,
        };
      })
    );

    return ordersWithUserNames;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    console.log("Updating order status:", orderId, newStatus);
    const response = await axiosInstance.patch(`/orders/${orderId}/status`, {
      status: newStatus,
    });
    return response.data;
  } catch (err) {
    console.error("Error updating order status:", err);
    throw err;
  }
}