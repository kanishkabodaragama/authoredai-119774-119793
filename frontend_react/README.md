# AI Article Writer – Frontend React App

This is the React-based frontend for the **AI Article Writing Tool** project. It provides a modern, minimal interface for users to register, log in, generate AI-written articles, and view results.

---

## Project Overview

The application allows users to:
- Register and log in using email/password (authentication via Supabase).
- Enter an article topic and desired word count.
- Submit requests for article generation (REST API – requires authentication).
- View the generated article.
- Log out securely.

The frontend communicates with the backend via REST endpoints and uses an auth token for protected actions.

---

## Quickstart Guide

### 1. Install dependencies

```bash
npm install
```

### 2. Development Mode

```bash
npm start
```
- Opens at [http://localhost:3000](http://localhost:3000)
- All API requests (starting `/api/...`) are proxied to the backend (see `package.json` `"proxy"`) during development.
- The backend should be running at [http://localhost:5000](http://localhost:5000) for proxying to work.

> **Tip:** No CORS changes are needed for the frontend; the proxy handles cross-origin concerns in dev mode.

### 3. Production Build

```bash
npm run build
```
Builds the app for production in the `build/` directory.  
To serve with HTTPS and connect to the backend, you **must** configure the API base URL:

- Set the `REACT_APP_API_BASE_URL` in a `.env` file at the project root (see below).
- The backend should be reachable from your deployed frontend.

### 4. Environment Variables

- **Development:** Usually, only the backend must be configured. API calls proxy through `/api`.
- **Production:** Create a `.env` file with:
  ```
  REACT_APP_API_BASE_URL=https://your.deployed-backend.example.com/api
  ```
  This tells the frontend where to find the backend API.

---

## Authentication & API Workflow

The app requires authentication for article generation. The typical flow is:
1. **Register/Login:**  
   - POST `/api/auth/register`   (with email, password)  
   - POST `/api/auth/login`      (returns a JWT token)
2. **Protected API Call:**  
   - Use the **JWT token** (stored in localStorage as `auth_token`) for requests to `/api/article/generate`.
   - JWT is sent via the `Authorization: Bearer <token>` header.
3. **Article Generation**  
   - POST `/api/article/generate` (body: `{ topic, word_count }`)  
   - Returns generated article or an error.

> See `src/AuthContext.js` and `src/ArticleForm.js` for API details.

---

## Third-Party Services

- **Supabase:** Used for user authentication.  
  Backend configuration is required; see backend documentation for credentials/env setup.
- **OpenAI:** Used by the backend for article generation (requires API key and backend config).

---

## Frontend–Backend Communication

- **Development:**  
  - Requests to `/api/*` are routed to the backend using the React dev `proxy` (set in `frontend_react/package.json`).
- **Production:**  
  - Set `REACT_APP_API_BASE_URL` in the environment file to point to your live backend instance.

**CORS Note:** The backend must allow requests from the frontend's domain (see backend docs to configure Express CORS).

---

## Project Structure

```
frontend_react/
├── src/
│   ├── App.js
│   ├── ArticleForm.js
│   ├── ArticleDisplay.js
│   ├── AuthComponents.js
│   ├── AuthContext.js
│   ├── Navbar.js
│   └── ...
├── public/
├── package.json
├── README.md
└── ...
```

### Key Components

- `Navbar.js` – Navigation between login/register and article page
- `AuthComponents.js` and `AuthContext.js` – Authentication logic, token storage, login/register forms
- `ArticleForm.js`, `ArticleDisplay.js` – UI logic and display for article generation flow

---

## Troubleshooting & Operational Notes

- **The backend must be running before `npm start` on the frontend for API proxy to function.**
- If the backend API URL changes, update the `"proxy"` field in your `package.json` and/or the `.env` `REACT_APP_API_BASE_URL`.
- Make sure your `.env` files are not committed to version control (add `.env` to `.gitignore`).
- Errors like "Network Error" or "Failed to fetch" usually indicate the backend is down or misconfigured.
- If you get CORS errors in production, ensure the backend CORS settings allow requests from the domain where the frontend is served.
- For OpenAI quota/credential errors, check the backend logs.

---

## Customization & Styling

Colors and themes are controlled by CSS variables in `src/App.css`.  
Main UI components are coded using only HTML and CSS for ease of customization.  

---

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

