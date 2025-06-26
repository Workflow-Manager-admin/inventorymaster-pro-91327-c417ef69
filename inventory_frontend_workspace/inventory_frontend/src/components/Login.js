import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import "../App.css";

// PUBLIC_INTERFACE
function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "", role: "Admin" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this block with backend authentication logic.
    if (!form.username || !form.password) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    login({ username: form.username, role: form.role });
    navigate("/");
  };

  return (
    <div className="center-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Username
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={form.username}
            onChange={handleInput}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleInput}
            required
          />
        </label>
        <label>
          Role
          <select name="role" value={form.role} onChange={handleInput}>
            <option>Admin</option>
            <option>Manager</option>
            <option>Staff</option>
          </select>
        </label>
        {error && <div className="form-error">{error}</div>}
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
