# DigiLocker-style Information Management System

Secure document vault built with React + Tailwind (frontend) and Node.js + Express + MongoDB (backend). Features uploading PDFs/images, inline preview, sharing to other users, activity summaries, and JWT authentication.

## Project structure
- `backend/` – Express API, MongoDB models, JWT auth, uploads folder (disk storage; swap for S3/Cloudinary easily in `middleware/upload.js`).
- `frontend/` – React + Vite app with Tailwind UI, dashboard, upload flow, viewer, and sharing.

## Backend setup
1) `cd backend`
2) `npm install`
3) Copy `env.example` to `.env` and set values (Mongo URI, JWT secret, client URL).
4) `npm run dev` (or `npm start`) – serves on port 5000 by default.

## Frontend setup
1) `cd frontend`
2) `npm install`
3) Create `.env` with `VITE_API_URL=http://localhost:5000/api`
4) `npm run dev` – Vite dev server on port 5173.

## Core API endpoints
- `POST /api/auth/register` – create account
- `POST /api/auth/login` – JWT login
- `POST /api/auth/forgot-password` – generate reset token (returned in response)
- `POST /api/auth/reset-password` – reset using token
- `GET /api/auth/me` – current user
- `POST /api/documents/upload` – upload file (field `file`) with `title`, `category`, `tags`
- `GET /api/documents` – list own docs (query: `category`, `search`)
- `GET /api/documents/shared` – docs shared with user
- `GET /api/documents/:id` – fetch by id
- `PUT /api/documents/:id` – update title/category/tags
- `DELETE /api/documents/:id` – remove (owner only)
- `POST /api/documents/:id/share` – share with another registered user via email
- `GET /api/documents/activity` – activity summary

## Notes
- Uploads are stored in `backend/uploads` and served at `/uploads/*`.
- Password reset emails are not sent; the token is returned for testing.
- CORS origin reads `CLIENT_URL` (comma-separated allowed origins).
- Tailwind styles live in `frontend/src/index.css`; main layout is in `App.jsx`.

