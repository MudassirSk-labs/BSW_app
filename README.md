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
The backend server will run at `http://localhost:5000`.

### 3. Setting up the Frontend
```bash
cd frontend
npm install
# NOTE: No .env file is required for the frontend!
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

## 🧪 API Testing
Refer to `backend/postman.md` for a complete list of endpoints and sample payloads for testing with Postman.
