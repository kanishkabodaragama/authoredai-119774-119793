import React, { createContext, useState, useEffect } from "react";

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * AuthProvider manages authentication state for the application. Provides login, register, and logout functions.
 * Stores token in localStorage under 'auth_token'.
 * Children components can consume authentication info via AuthContext.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token"));
  const [user, setUser] = useState(null); // Optionally store user info

  // Load user info (if any is needed) when token changes
  useEffect(() => {
    if (token) {
      // Optionally fetch user info here if backend provides endpoint
      setUser({ email: "authenticated" }); // Placeholder - replace with fetch if needed
    } else {
      setUser(null);
    }
  }, [token]);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("auth_token", data.token);
        setToken(data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  // PUBLIC_INTERFACE
  const register = async (email, password) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("auth_token", data.token);
        setToken(data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message || "Registration failed" };
      }
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, user, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}
