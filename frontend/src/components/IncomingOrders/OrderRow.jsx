import { useState } from "react";
import styled from "styled-components";
import { OrderStatus, updateOrderStatus } from "../../api/orderApi";

const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
`;

const Dropdown = styled.select`
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
  color: #111827;
  cursor: pointer;
  outline: none;
`;

const StatusButton = styled.button`
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: white;
  color: ${(props) => props.textColor || "#6b7280"};
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: 0.2s ease all;
  font-weight: 500;
  
  &:hover {
    background-color: #f9fafb;
  }
`

const statusColors = {
  Pending: "#f59e0b", // Amber
  Confirmed: "#3b82f6", // Blue
  Preparing: "#8b5cf6", // Violet
  "Out for Delivery": "#10b981", // Emerald
  Cancelled: "#ef4444", // Red
}
export default function OrderRow({ order }) {
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState(order.status);

  const statusOptions = Object.values(OrderStatus);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setEditing(false);

    try {
      await updateOrderStatus(order.fullId, newStatus);
    } catch (err) {
      alert("Failed to update order status.");
    }
  };

  return (
    <tr>
      <TableCell>{order.id}</TableCell>
      <TableCell>{order.customer}</TableCell>
      <TableCell>{order.date}</TableCell>
      <TableCell>{order.time}</TableCell>

      <TableCell>
        {editing ? (
          <Dropdown
            value={status}
            onChange={handleStatusChange}
            onBlur={() => setEditing(false)}
            autoFocus
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Dropdown>
        ) : (
          <StatusButton onClick={() => setEditing(true)} textColor={statusColors[status]}>
            {status}
          </StatusButton>
        )}
      </TableCell>

      <TableCell>{order.timeLeft}</TableCell>
      <TableCell>{order.total.toFixed(2)} EGP</TableCell>
    </tr>
  );
}
