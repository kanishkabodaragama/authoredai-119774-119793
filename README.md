# Project Repository

This is the initial README file for the project.

## Local Development Setup: CORS & Proxy

- The frontend React app uses a dev-time proxy for API requests to the backend.
- **Backend must allow CORS requests from `http://localhost:3000` for development.**
    - For Node.js + Express, add in your backend:
        ```js
        const cors = require('cors');
        app.use(cors({
          origin: 'http://localhost:3000',
          credentials: true
        }));
        ```
- See `frontend_react/README.md` for details about proxying `/api` calls and configuration.
