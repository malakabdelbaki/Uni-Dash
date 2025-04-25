export const OrderStatus = Object.freeze({
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
});

export async function fetchOrders(restaurantId) {
  const res = await fetch(`http://localhost:5000/api/orders/restaurant/${restaurantId}`);
  const orders = await res.json();

  const ordersWithUserNames = await Promise.all(
    orders.map(async (order) => {
      let userName = "Unknown";

      
      if (typeof order.userId === "string") {
        try {
          const userRes = await fetch(`http://localhost:5000/api/users/${order.userId}`);
          const userData = await userRes.json();
          userName = userData.name || "Unknown";
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
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
   console.log(orderId)
    const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    return await res.json();
  } catch (err) {
    console.error("Error updating order status:", err);
    throw err;
  }
}