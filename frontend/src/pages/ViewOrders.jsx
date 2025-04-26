import IncomingOrders from "../components/orders/IncomingOrders/IncomingOrders";
import Header from "../components/Header";
import { OrdersProvider } from "../context/OrdersContext";
import { useParams } from "react-router-dom";

export default function ViewOrdersPage() {
  const { restaurantId } = useParams();
  
  return (
    <OrdersProvider restaurantId={restaurantId}>
      <div className="container mx-auto px-4 py-6">
        <Header />
        <IncomingOrders />
      </div>
    </OrdersProvider>
  );
}