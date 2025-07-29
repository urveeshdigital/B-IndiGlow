import React, { useEffect, useState } from "react";
import "./Order.css";
import OverviewTab from "./OverviewTab";
import ProfileLayout from './ProfileLayout';
const Order = () => {
  const [orders, setOrders] = useState([]);

  // Dummy data - replace this with actual API call
  useEffect(() => {
    const dummyOrders = [
      {
        id: "ORD12345",
        date: "2025-07-21",
        items: ["Product A", "Product B"],
        total: 1499,
        status: "Delivered",
      },
      {
        id: "ORD12346",
        date: "2025-07-20",
        items: ["Product C"],
        total: 799,
        status: "Processing",
      },
      {
        id: "ORD12347",
        date: "2025-07-19",
        items: ["Product D", "Product E", "Product F"],
        total: 2599,
        status: "Cancelled",
      },
    ];
    setOrders(dummyOrders);
  }, []);

  return (
        <ProfileLayout>
    <div className="order-page">
      {/* <div className="sidebar"></div> */}
      <div className="order-content">
        <OverviewTab />
        <div className="orders-container">
          <h2>My Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.items.join(", ")}</td>
                    <td>₹{order.total}</td>
                    <td className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </ProfileLayout>
  );
};

export default Order;

