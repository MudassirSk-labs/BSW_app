# BSW App - Decoupled Architecture

This project is a production-grade employee management and scheduling application with a Next.js frontend and a Node.js/Express backend, integrated with Supabase.

## Project Structure
- `/frontend`: Next.js 15+ application (UI/UX).
- `/backend`: Node.js/Express API (Employee CRUD).

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
# Ensure .env is configured with SUPABASE_URL and SUPABASE_ANON_KEY
npm run dev
```
The backend server will run at `http://localhost:5000`.

### 3. Setting up the Frontend
```bash
cd frontend
npm install
# Ensure .env.local is configured:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# ADMIN_USER=Admin (or your desired user)
# ADMIN_PASS=1234 (or your desired pass)
npm run dev
```
The frontend will run at `http://localhost:3000`. You can log in using the credentials defined in your `.env.local`.

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
