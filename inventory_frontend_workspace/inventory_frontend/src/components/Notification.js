import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function Notification({ notification }) {
  if (!notification) return null;
  return (
    <div className={`notification alert-${notification.type || "info"}`}>
      {notification.msg}
    </div>
  );
}
export default Notification;
