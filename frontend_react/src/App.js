import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthProvider, AuthContext } from "./AuthContext";
import { Login, Register } from "./AuthComponents";
import ArticleForm from "./ArticleForm";
import Navbar from "./Navbar";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [mode, setMode] = useState('login'); // "login" | "register" | null for routed panel
  const [nav, setNav] = useState("generate"); // For minimal navigation

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
            <Navbar
              onNav={setNav}
              current={isAuthenticated ? nav : mode}
              setMode={isAuthenticated ? undefined : setMode}
            />
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            <div style={{ marginTop: 32 }}>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <p>
              AI Article Writer Demo (<code>src/App.js</code>)
            </p>
            <p>
              Current theme: <strong>{theme}</strong>
            </p>
            {isAuthenticated ? (
              <>
                {/* Nav could be used for more routes, for now only 1 main */}
                {nav === "generate" && (
                  <ArticleForm />
                )}
              </>
            ) : (
              // Show AuthPanel only if mode is set, else nothing (after login success)
              mode != null && <AuthPanel />
            )}
          </div>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
