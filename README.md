# BSW App - Decoupled Architecture (Secure Backend)

This project is a production-grade employee management and scheduling application with a Next.js frontend and a Node.js/Express backend, integrated with Supabase.

## Project Structure
- `/frontend`: Next.js 15+ application (UI/UX). All requests are proxied via the backend.
- `/backend`: Node.js/Express API. **All environment variables are centralized here.**

---

## 🚀 How to Run Locally

### 1. Prerequisites
- Node.js installed.
- Supabase project set up.
- Groq AI API key.

### 2. Setting up the Backend
```bash
cd backend
npm install
# Configure .env with the following:
# PORT=5000
# SUPABASE_URL=...
# SUPABASE_ANON_KEY=...
# SUPABASE_SERVICE_ROLE_KEY=...
# GROQ_API_KEY=...
# ADMIN_USER=Admin
# ADMIN_PASS=1234
npm run dev
```
The backend server will run at `http://localhost:5001`.

### 3. Setting up the Frontend
```bash
cd frontend
npm install
# NOTE: The frontend is currently configured to use the production backend:
# https://bsw-app-omega.vercel.app/api
npm run dev
```
The frontend will run at `http://localhost:3000`. It will communicate with the backend at port 5000.

---

## 🛠 Building the Project

### Build Backend
```bash
cd backend
npm run build
```

### Build Frontend
```bash
cd frontend
npm run build
```

---

## 📦 Pushing to Repository
```bash
git add .
git commit -m "Your commit message"
git push
```
*(Note: node_modules and .env files are ignored automatically)*

---

## 🚀 Deployment to Vercel

### 1. Backend Deployment
1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Set the **Root Directory** to `backend`.
4.  Add the following **Environment Variables** in Vercel:
    - `SUPABASE_URL`
    - `SUPABASE_SERVICE_ROLE_KEY`
    - `GROQ_API_KEY`
    - `ADMIN_USER`
    - `ADMIN_PASS`
5.  Deploy! Your backend will be at `https://your-backend.vercel.app`.

### 2. Frontend Deployment
1.  Import the project in Vercel.
2.  Set the **Root Directory** to `frontend`.
3.  Ensure the code points to your *deployed* backend URL (update the `BACKEND_URL` in frontend services if necessary, or use an environment variable).

---

## 🧪 API Testing
Refer to `backend/postman.md` for a complete list of endpoints and sample payloads for testing with Postman.
