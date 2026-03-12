# Postman API Documentation (Proxy)

All requests should now be directed to the Node.js Backend API, which acts as a secure proxy to Supabase.

## Base Configuration
- **Base URL**: `http://localhost:5001/api`
- **Content-Type**: `application/json`

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
- **Note**: The response will include a `token`. Use this if you want to test restricted Supabase calls, but the Proxy handles the Service Role key internally.

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
