import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function Widget({ title, value, icon, alert }) {
  return (
    <div className={`widget-card${alert ? " widget-alert" : ""}`}>
      <div className="widget-icon">{icon}</div>
      <div className="widget-info">
        <div className="widget-title">{title}</div>
        <div className="widget-value">{value}</div>
      </div>
    </div>
  );
}
export default Widget;
