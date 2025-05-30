import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import ControlPanel from "./ControlPanel";

const Navbar = () => {
  const [showControlsModal, setShowControlsModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [user, setUser] = useState({ user_name: "", user_age: "", user_email: "" });
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleUserDetails = () => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetch("http://localhost:5000/api/user-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then(res => res.json())
        .then(data => {
          if (!data.error) setUser(data);
          setShowUserModal(true);
        });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowUserModal(false);
    navigate("/login", { replace: true });
    window.location.reload(); // Ensures all state is reset
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.user_email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <nav className="navbar amazon-navbar">
      {/* Amazon Logo - extreme left */}
      <div className="navbar-left">
        <img
          src="https://img.icons8.com/color/48/000000/amazon.png"
          alt="Amazon Logo"
          className="navbar-logo-small"
        />
      </div>

      {/* Center - Settings Button */}
      <div className="navbar-center">
        <button
          className="navbar-control-btn"
          onClick={() => setShowControlsModal(true)}
        >
          <span role="img" aria-label="settings">⚙️</span> Crawler Settings
        </button>
      </div>

      {/* Extreme right - User Details Button */}
      <div className="navbar-right">
        <button
          className="navbar-user-btn"
          onClick={handleUserDetails}
        >
          <span role="img" aria-label="user">👤</span> User Details
        </button>
      </div>

      {/* User Details Modal */}
      {showUserModal && (
        <div className="user-modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="user-modal" onClick={e => e.stopPropagation()}>
            <button
              className="user-modal-close"
              onClick={() => setShowUserModal(false)}
              title="Close"
            >❌</button>
            <div className="user-modal-row">
              <img
                src="https://i.pravatar.cc/60"
                alt="Profile"
                className="navbar-profile-img"
              />
              <div className="user-modal-details">
                <div className="flex items-center gap-2 text-gray-600 text-base mb-1">
                  👤 {user.user_name}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-base mb-1">
                  <span role="img" aria-label="age">🎂 {user.user_age}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-base mb-1">
                  <span role="img" aria-label="email">✉️ {user.user_email}</span>
                  <button
                    className="copy-btn"
                    onClick={handleCopyEmail}
                    title="Copy Email"
                    style={{
                      marginLeft: "0.5rem",
                      background: "#fff",
                      border: "1px solid #ffce4a",
                      borderRadius: "0.3rem",
                      padding: "0.1rem 0.5rem",
                      cursor: "pointer",
                      fontSize: "0.95rem"
                    }}
                  >
                    {copied ? "✔️" : "📋"}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-base cursor-pointer hover:text-red-500 transition mt-2">
                  <span role="img" aria-label="logout">🚪</span>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings (Crawler Controls) Modal */}
      {showControlsModal && (
        <div className="user-modal-overlay" onClick={() => setShowControlsModal(false)}>
          <div className="user-modal" onClick={e => e.stopPropagation()}>
            <button
              className="user-modal-close"
              onClick={() => setShowControlsModal(false)}
              title="Close"
            >❌</button>
            <h2 className="mb-4 text-lg font-semibold text-gray-700">Crawler Controls</h2>
            <ControlPanel compact />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;