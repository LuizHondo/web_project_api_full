# Around the U.S. — Full-Stack (Frontend + Backend)

This project is a full-stack implementation of “Around the U.S.”, built as part of TripleTen sprints. It includes a RESTful Node.js/Express API with MongoDB and a React (Vite) frontend.

## Overview
- Backend: Express 5, Mongoose 8, JWT auth, Celebrate/Joi validation, Winston logging, Helmet, CORS
- Frontend: React 19 (Vite), React Router
- Tests: Jest + Supertest (backend)

## Monorepo Structure
- ackend/ — API service (Express)
- rontend/ — SPA (React + Vite)

## Requirements
- Node.js 20+
- MongoDB 6+ (local or remote)

## Environment Variables
Create ackend/.env based on ackend/.env.example:

`
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/aroundb
JWT_SECRET=replace-with-strong-secret
NODE_ENV=development
`

Notes
- The backend is configured (in development) to load ackend/.env. Do not commit real secrets; .env is ignored by Git. Use ackend/.env.example as a template for collaborators.
- In production, set env vars via your host/PM2/process manager.

Frontend optional env (rontend/.env):

`
VITE_API_BASE_URL=http://localhost:3001
`

## Install

From the repository root, install both apps:

`
cd backend && npm install
cd ../frontend && npm install
`

## Run (Development)

Terminal A — backend API:

`
cd backend
npm run dev
`

Terminal B — frontend (Vite):

`
cd frontend
npm run dev
`

Default ports
- Backend: http://localhost:3001
- Frontend dev server: http://localhost:5173 (Vite)

If the frontend needs a custom API origin, set VITE_API_BASE_URL accordingly.

## Run (Production)

Ensure the following env vars are set by your environment (do not rely on files in production):
- PORT
- MONGODB_URI
- JWT_SECRET
- NODE_ENV=production

Then start the backend:

`
cd backend
npm start
`

An example PM2 config is available at ackend/ecosystem.config.js.

## API Summary

Auth
- POST /signin — Login, returns JWT
- POST /signup — Register user

Users (protected)
- GET /users — List users
- GET /users/me — Current user
- GET /users/:id — Get by ID
- PATCH /users/me — Update profile
- PATCH /users/me/avatar — Update avatar

Cards (protected)
- GET /cards — List cards
- GET /cards/:id — Get by ID
- POST /cards — Create
- DELETE /cards/:id — Delete (owner only)
- PUT /cards/:id/likes — Like
- DELETE /cards/:id/likes — Remove like

Health & Ops
- GET /health — Health check (200 OK)

## Security & Hardening
- Helmet enabled; app trusts proxy (pp.set('trust proxy', 1)).
- Use strong JWT_SECRET in production; rotate regularly.
- Restrict CORS origins to your deployed domains in production.
- Consider rate limiting for auth endpoints.

## Testing & Linting (Backend)

`
cd backend
npm test           # Jest + Supertest
npm run lint       # ESLint (Airbnb base)
`

## Common Troubleshooting
- App starts without .env in dev: the code can fall back to example/defaults for convenience. For strict behavior, remove dev fallbacks and require envs.
- Cannot connect to MongoDB: check MONGODB_URI and Mongo service status.
- 401 errors: ensure the Authorization: Bearer <token> header is present and signed with the same JWT_SECRET.

## License
ISC — see package metadata.