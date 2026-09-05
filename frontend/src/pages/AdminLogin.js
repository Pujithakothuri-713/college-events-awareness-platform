import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [isRecovering, setIsRecovering] = useState(false);
  const [showCreateAdminForm, setShowCreateAdminForm] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setRecoveryMessage("");

    try {
      const response = await axios.post(
        `${API_URL}/api/admin/login`,
        { email, password }
      );

      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setRecoveryMessage("Please enter your email address first.");
      return;
    }

    setIsRecovering(true);
    setRecoveryMessage("");

    try {
      await axios.post(`${API_URL}/api/admin/forgot-password`, {
        email,
      });

      setRecoveryMessage(
        "If that email is registered, recovery instructions will be sent shortly."
      );
    } catch (err) {
      setRecoveryMessage(
        "If that email is registered, recovery instructions will be sent shortly."
      );
    } finally {
      setIsRecovering(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setRegisterMessage("");

    if (!registerEmail.trim()) {
      setRegisterMessage("Email is required.");
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      setRegisterMessage("Passwords do not match.");
      return;
    }

    setIsCreatingAdmin(true);

    try {
      await axios.post(`${API_URL}/api/admin/register`, {
        email: registerEmail,
        password: registerPassword,
      });

      setRegisterMessage("Admin created successfully. You can now log in.");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirmPassword("");
    } catch (err) {
      setRegisterMessage(
        err.response?.data?.message || "Unable to create admin right now."
      );
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  return (
    <div className="container">
      <h1>🔐 Admin Login</h1>

      <div className="card">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginTop: "16px" }}>
            <button type="submit">Login</button>
            <button
              type="button"
              onClick={() => {
                setShowCreateAdminForm((prev) => !prev);
                setRegisterMessage("");
              }}
            >
              {showCreateAdminForm ? "Hide sign up" : "Sign up"}
            </button>
          </div>
        </form>

        <div
          style={{
            marginTop: "16px",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "12px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setShowRecoveryForm((prev) => !prev);
              setRecoveryMessage("");
            }}
            style={{
              background: "transparent",
              color: "#2563eb",
              padding: 0,
              borderRadius: 0,
              textDecoration: "underline",
            }}
          >
            Forgot password?
          </button>

          {showRecoveryForm && (
            <div
              style={{
                marginTop: "12px",
                padding: "12px",
                background: "#f9fafb",
                borderRadius: "8px",
              }}
            >
              <p style={{ margin: "0 0 10px" }}>
                Enter your email address to request account recovery.
              </p>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isRecovering}
                style={{ marginTop: "10px" }}
              >
                {isRecovering ? "Sending..." : "Send recovery instructions"}
              </button>

              {recoveryMessage && (
                <p style={{ color: "#1f2937", marginTop: "10px" }}>{recoveryMessage}</p>
              )}
            </div>
          )}
        </div>

        {showCreateAdminForm && (
          <form
            onSubmit={handleCreateAdmin}
            style={{
              marginTop: "12px",
              padding: "12px",
              background: "#f9fafb",
              borderRadius: "8px",
            }}
          >
            <p style={{ margin: "0 0 10px" }}>
              Create a new admin account for the platform.
            </p>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginTop: "10px" }}>
              <label>Password</label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginTop: "10px" }}>
              <label>Confirm Password</label>
              <input
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isCreatingAdmin}
              style={{ marginTop: "10px" }}
            >
              {isCreatingAdmin ? "Signing up..." : "Sign up"}
            </button>

            {registerMessage && (
              <p style={{ color: "#1f2937", marginTop: "10px" }}>{registerMessage}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
