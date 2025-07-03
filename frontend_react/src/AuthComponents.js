import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

// PUBLIC_INTERFACE
export function Login({ onSuccess }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      setEmail("");
      setPassword("");
      if (onSuccess) onSuccess();
    } else {
      setError(res.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>
      {error && <div className="auth-error">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button type="submit" className="auth-btn" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

// PUBLIC_INTERFACE
export function Register({ onSuccess }) {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // PUBLIC_INTERFACE
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await register(email, password);
    setLoading(false);
    if (res.success) {
      setEmail("");
      setPassword("");
      if (onSuccess) onSuccess();
    } else {
      setError(res.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>
      {error && <div className="auth-error">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={e => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      <button type="submit" className="auth-btn" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

// PUBLIC_INTERFACE
export function Logout({ className }) {
  const { logout } = useContext(AuthContext);
  return (
    <button onClick={logout} className={className || "auth-btn"}>
      Logout
    </button>
  );
}
