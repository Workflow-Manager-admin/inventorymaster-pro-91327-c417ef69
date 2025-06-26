import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import TopBar from "./components/TopBar";
import SideNav from "./components/SideNav";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Items from "./components/Items";
import Suppliers from "./components/Suppliers";
import Categories from "./components/Categories";
import Reports from "./components/Reports";
import Notification from "./components/Notification";

// AuthContext is used to manage user auth and roles
export const AuthContext = createContext();

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null); // { username, role }
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Helper to show notifications
  const showNotification = (msg, type = "info") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Simulate authentication state from localStorage or server
  useEffect(() => {
    // TODO: Replace with session API call
    const stored = localStorage.getItem("authUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("authUser", JSON.stringify(userObj));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showNotification }}>
      <Router>
        <div className="inventory-app">
          {user && <SideNav role={user.role} />}
          <div className="main-content">
            {user && <TopBar username={user.username} onLogout={logout} theme={theme} setTheme={setTheme} />}
            <Notification notification={notification} />
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route
                path="/"
                element={
                  user ? (
                    <Dashboard setNotification={showNotification} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/items"
                element={
                  user ? <Items /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/suppliers"
                element={
                  user ? <Suppliers /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/categories"
                element={
                  user ? <Categories /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/reports"
                element={
                  user ? <Reports /> : <Navigate to="/login" />
                }
              />
              <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
