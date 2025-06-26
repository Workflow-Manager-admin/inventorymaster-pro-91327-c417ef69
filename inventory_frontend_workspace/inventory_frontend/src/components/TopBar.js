import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
function TopBar({ username, onLogout, theme, setTheme }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="brand">InventoryMaster Pro</span>
      </div>
      <div className="topbar-center" />
      <div className="topbar-right">
        <button
          className="theme-toggle topbar-btn"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <span className="user">{username}</span>
        <button className="topbar-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
export default TopBar;
