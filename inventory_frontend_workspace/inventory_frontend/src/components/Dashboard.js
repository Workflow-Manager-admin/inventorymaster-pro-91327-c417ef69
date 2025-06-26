import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import Widget from "./Widget";
import { AuthContext } from "../App";

// PUBLIC_INTERFACE
function Dashboard({ setNotification }) {
  const { user } = useContext(AuthContext);
  // Metrics state - would typically be fetched from backend
  const [metrics, setMetrics] = useState({
    totalItems: 0,
    lowStock: 0,
    categories: 0,
    suppliers: 0,
  });
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    // Fetch inventory dashboard metrics
    // Replace with real API call:
    setMetrics({
      totalItems: 120,
      lowStock: 6,
      categories: 5,
      suppliers: 4,
    });
    setLowStockItems([
      { id: 1, name: "Printer Paper", quantity: 3 },
      { id: 2, name: "Black Pens", quantity: 1 },
    ]);
    setNotification && setNotification("Welcome to your dashboard!", "info");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dashboard">
      <div className="widgets-row">
        <Widget title="Total Items" value={metrics.totalItems} icon="📦" />
        <Widget title="Low Stock" value={metrics.lowStock} icon="⚠️" alert={metrics.lowStock > 0} />
        <Widget title="Categories" value={metrics.categories} icon="🏷️" />
        <Widget title="Suppliers" value={metrics.suppliers} icon="🚚" />
      </div>
      {metrics.lowStock > 0 && (
        <div className="low-stock-alert">
          <span>⚠️ Low-stock items:</span>
          <ul>
            {lowStockItems.map((it) => (
              <li key={it.id}>
                {it.name} (Qty: <span style={{ color: "red" }}>{it.quantity}</span>)
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="dashboard-info">
        <h2>Hello, {user?.username || "User"}!</h2>
        <p>
          This is your inventory dashboard. Use the navigation on the left to manage items, suppliers, categories, and download reports.
        </p>
      </div>
    </div>
  );
}
export default Dashboard;
