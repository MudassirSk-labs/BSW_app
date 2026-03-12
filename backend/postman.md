# Postman API Documentation (Production Proxy)

All requests should be directed to the deployed Vercel Backend API.

## Base Configuration
- **Base URL**: `https://bsw-app-omega.vercel.app/api`
- **Content-Type**: `application/json`

---

## 0. Diagnostics

### Check Backend Status
- **GET** `{{Base URL}}/debug`
- **Expected Response**: JSON showing the status of environment variables (Supabase URL, Key, etc.) on the Vercel server.

### Health Check
- **GET** `{{Base URL}}/health`

---

## 1. Authentication

### Login
- **POST** `{{Base URL}}/auth/login`
- **Body**:
```json
{
  "user": "Admin",
  "pass": "1234"
}
```

---

## 2. Employee Management

### Get All Employees
- **GET** `{{Base URL}}/employees`

### Add New Employee
- **POST** `{{Base URL}}/employees`
- **Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@bsw.com",
  "phone": "555-1234",
  "role": "Assistant Manager"
}
```

### Delete Employees (Bulk)
- **DELETE** `{{Base URL}}/employees`
- **Body**:
```json
{
  "ids": ["uuid1", "uuid2"]
}
```

---

## 3. Scheduler

### Get Schedule
- **GET** `{{Base URL}}/schedule?employee_ids=uuid1,uuid2`

### Save Schedule
- **POST** `{{Base URL}}/schedule`
- **Body**:
```json
{
  "days": [
    {
      "employee_id": "uuid1",
      "day_date": "2026-03-12",
      "is_off": false,
      "is_required_off": false,
      "is_manual_off": false
    }
  ]
}
```

---

## 4. AI Helper

### Analyze Coverage
- **POST** `{{Base URL}}/ai/analyze`
- **Body**:
```json
{
  "prompt": "Analyze these employees for a weekend shift..."
}
```
