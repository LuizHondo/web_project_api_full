# Around the U.S. — Full-Stack (Frontend + Backend)

Full-stack implementation of “Around the U.S.” (TripleTen) with a RESTful Node.js/Express API (MongoDB) and a React (Vite) frontend.

## Overview
- Backend: Express 5, Mongoose 8, JWT auth, Celebrate/Joi validation, Winston logging, Helmet, CORS
- Frontend: React 19 (Vite), React Router
- Tests: Jest + Supertest (backend)

## Monorepo Structure
- `backend/` — API service (Express)
- `frontend/` — SPA (React + Vite)

## Requirements
- Node.js 20+
- MongoDB 6+ (local or remote)

## Environment Variables
Create `backend/.env` from `backend/.env.example`:

```
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/aroundb
JWT_SECRET=replace-with-strong-secret
NODE_ENV=development
```

Notes
- Do not commit real secrets. `.env` is git-ignored; use `backend/.env.example` as a template.
- In production, set env vars via your host/PM2; avoid `.env` files.

Frontend (optional) `frontend/.env`:
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

Dev behavior
- Vite proxies `/_api` requests to the backend:
  - Dev origin: `http://localhost:3000`
  - Proxy target: `http://localhost:3001`
  - Path: requests to `/api/*` are forwarded to the backend (with `/api` stripped)
- If you prefer direct calls, set `VITE_API_BASE_URL` to `http://localhost:3001`.

## Run (Production)
Ensure the environment provides and exports:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `NODE_ENV=production`

Start the backend:
```
cd backend
npm start
```
(Defaults to port 3001 per `package.json`. Adjust as needed for your host/process manager.)

PM2 example config: `backend/ecosystem.config.js`.

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

## Security & Hardening
- Helmet enabled; `app.set('trust proxy', 1)` for proxies/load balancers
- Use strong `JWT_SECRET` in production; rotate regularly
- Restrict CORS origins to deployed domains (dev allows `http://localhost:3000`)
- Consider rate limiting for auth endpoints

## Testing & Linting (Backend)
```
cd backend
npm test           # Jest + Supertest
npm run lint       # ESLint (Airbnb base)
```

## Troubleshooting
- Cannot connect to MongoDB: verify `MONGODB_URI` and Mongo service status
- 401 errors: ensure `Authorization: Bearer <token>` and matching `JWT_SECRET`
- Port conflicts: frontend uses 3000 (strict), backend uses 3001