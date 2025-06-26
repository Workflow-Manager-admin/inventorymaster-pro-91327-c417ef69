import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../App";

// PUBLIC_INTERFACE
function SideNav({ role }) {
  // Define access based on role
  const NAVS = [
    { to: "/", label: "Dashboard", roles: ["Admin", "Manager", "Staff"], icon: "📊" },
    { to: "/items", label: "Items", roles: ["Admin", "Manager", "Staff"], icon: "📦" },
    { to: "/suppliers", label: "Suppliers", roles: ["Admin", "Manager"], icon: "🚚" },
    { to: "/categories", label: "Categories", roles: ["Admin", "Manager"], icon: "🏷️" },
    { to: "/reports", label: "Reports", roles: ["Admin", "Manager"], icon: "📑" },
  ];
  return (
    <nav className="sidenav">
      <ul>
        {NAVS.filter((nav) => nav.roles.includes(role)).map((nav) => (
          <li key={nav.to}>
            <NavLink
              to={nav.to}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
                color: isActive ? "var(--primary-color, #1a73e8)" : "inherit",
              })}
            >
              <span style={{ marginRight: 10 }}>{nav.icon}</span>
              {nav.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default SideNav;
