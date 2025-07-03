import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthProvider, AuthContext } from "./AuthContext";
import { Login, Register, Logout } from "./AuthComponents";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('login'); // login or register

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  function AuthPanel() {
    // Renders login or register forms, and allows switching between them
    const switchMode = () => setMode(mode === "login" ? "register" : "login");
    return (
      <div>
        {mode === "login" ? (
          <>
            <Login onSuccess={() => setMode(null)} />
            <p>Don't have an account? <button className="auth-switch" onClick={switchMode}>Register</button></p>
          </>
        ) : (
          <>
            <Register onSuccess={() => setMode(null)} />
            <p>Already have an account? <button className="auth-switch" onClick={switchMode}>Login</button></p>
          </>
        )}
      </div>
    );
  }

  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ isAuthenticated, user }) => (
          <div className="App">
            <header className="App-header">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                AI Article Writer Demo (<code>src/App.js</code>)
              </p>
              <p>
                Current theme: <strong>{theme}</strong>
              </p>
              {isAuthenticated ? (
                <>
                  <div>Welcome{user && user.email ? `, ${user.email}` : "!"}</div>
                  <Logout className="auth-btn" />
                  <p>
                    You are logged in. (Article tool UI would appear here.)
                  </p>
                </>
              ) : (
                <AuthPanel/>
              )}
            </header>
          </div>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}


export default App;
