import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Logout } from "./AuthComponents";

/**
 * PUBLIC_INTERFACE
 * Navbar - navigation header, displays nav options based on authentication status.
 * Displays "Login" and "Register" for logged-out users, "Generate" and "Logout" for logged-in users.
 */
function Navbar({ onNav, current, setMode }) {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <nav
      className="navbar"
      style={{
        background: "var(--bg-secondary,#f8f9fa)",
        borderBottom: "1px solid var(--border-color,#e9ecef)",
        padding: "0.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 18,
        minHeight: 60
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          color: "var(--text-secondary,#2563eb)",
          letterSpacing: 2
        }}
      >
        AI Article Writer
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {isAuthenticated ? (
          <>
            <button
              className="auth-btn"
              style={{
                background: "transparent",
                color: "var(--button-bg,#2563eb)",
                border: "none",
                fontWeight: current==="generate"?"bold":"500",
                boxShadow: "none",
                textDecoration: current==="generate" ? "underline" : "none",
                cursor: "pointer"
              }}
              onClick={() => onNav && onNav("generate")}
            >
              Generate
            </button>
            <div style={{ color: "#64748b", marginRight: 8 }}>
              {user?.email ? user.email : null}
            </div>
            <Logout className="auth-btn" />
          </>
        ) : (
          <>
            <button
              className="auth-btn"
              style={{
                background: "transparent",
                color: "var(--button-bg,#2563eb)",
                border: "none",
                fontWeight: current==="login" ? "bold" : "500",
                textDecoration: current==="login" ? "underline" : "none",
                boxShadow: "none",
                cursor: "pointer"
              }}
              onClick={() => setMode && setMode("login")}
            >
              Login
            </button>
            <button
              className="auth-btn"
              style={{
                background: "transparent",
                color: "var(--button-bg,#2563eb)",
                border: "none",
                fontWeight: current==="register" ? "bold" : "500",
                textDecoration: current==="register" ? "underline" : "none",
                boxShadow: "none",
                cursor: "pointer"
              }}
              onClick={() => setMode && setMode("register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
