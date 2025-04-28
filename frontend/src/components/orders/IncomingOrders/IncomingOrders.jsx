import { useContext } from "react";
import styled from "styled-components";
import { OrdersContext } from "../../../context/OrdersContext";
import OrderRow from "./OrderRow";
import "./style.css";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

const TableTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #f9fafb;
  color: #6b7280;
  border-bottom: 2px solid #e5e7eb;
`;

const IncomingOrders = () => {
  const { orders, loading, error } = useContext(OrdersContext);

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error-message">Error loading orders: {error}</div>;

  return (
    <TableContainer>
      <TableTitle>Restaurant Orders</TableTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Time</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Time Left</TableHeader>
            <TableHeader>Total</TableHeader>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default IncomingOrders; 