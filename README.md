# Around the U.S. — Full‑Stack (Frontend + Backend)

Full‑stack implementation of “Around the U.S.” (TripleTen) with a RESTful Node.js/Express API (MongoDB) and a React (Vite) frontend.

## Stack
- Backend: Express 5, Mongoose 8, JWT auth, Celebrate/Joi validation, Winston logging, Helmet, CORS
- Frontend: React 19 (Vite), React Router
- Tests: Jest + Supertest (backend)

## Structure
```
web_project_api_full/
├─ backend/      # API service (Express)
└─ frontend/     # SPA (React + Vite)
```

## Requirements
- Node.js 20+
- MongoDB 6+ (local or remote)

## Environment Variables
Create `backend/.env` from `backend/.env.example`:
```
PORT=3001
# Connection string can omit the DB; app uses DB_NAME
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=aroundb
JWT_SECRET=replace-with-strong-secret
NODE_ENV=development
```
Notes
- Do not commit real secrets. `.env` is git-ignored; use `backend/.env.example` as a template.
- In production, set env vars via your host/PM2/process manager (avoid `.env` files).
- If your `MONGODB_URI` already includes a database in the path, the app will still use `DB_NAME` (default `aroundb`).

Frontend `frontend/.env`:
```
# Use only if not relying on the dev proxy
VITE_API_BASE_URL=http://localhost:3001
```

## Install
From the repository root, install both apps:
```
cd backend && npm install
cd ../frontend && npm install
```

## Run (Development)
Backend API (port 3001):
```
cd backend
npm run dev
```

Frontend (Vite, port 3000):
```
cd frontend
npm run dev
```

Dev proxy (Vite)
- Dev origin: `http://localhost:3000`
- Proxy target: `http://localhost:3001`
- Path: requests to `/api/*` are forwarded to the backend (with `/api` stripped)
- To call backend directly instead of the proxy, set `VITE_API_BASE_URL=http://localhost:3001`

## Run (Production)
Ensure the environment provides:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

Start the backend:
```
cd backend
npm start
```



PM2 example config: `backend/ecosystem.config.js`.

Reverse proxy (example Nginx)
```
server {
  listen 80;
  server_name luizhondo.com www.luizhondo.com;

  root /var/www/frontend/dist;
  location / {
    try_files $uri /index.html;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:3001/;   # backend
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

CORS
- In `backend/app.js`, allowed origins include:
  - `http://localhost:3000`
- Adjust this list for your deployment domains as needed.

## API Summary
Auth
- `POST /signin` — Login, returns JWT
- `POST /signup` — Register user

Users (protected)
- `GET /users` — List users
- `GET /users/me` — Current user
- `GET /users/:id` — Get by ID
- `PATCH /users/me` — Update profile
- `PATCH /users/me/avatar` — Update avatar

Cards (protected)
- `GET /cards` — List cards
- `GET /cards/:id` — Get by ID
- `POST /cards` — Create
- `DELETE /cards/:id` — Delete (owner only)
- `PUT /cards/:id/likes` — Like
- `DELETE /cards/:id/likes` — Remove like

Health & Ops
- `GET /health` — Health check (200 OK)

## Security Notes
- Helmet enabled; `app.set('trust proxy', 1)` for proxies/load balancers
- Use a strong `JWT_SECRET` in production; rotate regularly
- Restrict CORS origins to deployed domains
- Consider rate limiting for auth endpoints

## Testing & Linting (Backend)
```
cd backend
npm test           # Jest + Supertest
npm run lint       # ESLint (Airbnb base)
```

## Troubleshooting
- Mongo connection: verify `MONGODB_URI` and service status
- 401 responses: ensure `Authorization: Bearer <token>` and matching `JWT_SECRET`
- Port conflicts: frontend uses 3000; backend uses 3001
