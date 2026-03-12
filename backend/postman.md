# Postman API Documentation (Supabase)

Since we are using Supabase as our backend service, you can interact with the API directly using the Postman collection below.

## Base Configuration
- **URL**: `https://wgwceabdmkibawivuirc.supabase.co/rest/v1`
- **Headers**:
    - `apikey`: `sb_publishable_0K8TQFz5c045HTJdCLWpzw_ckD3y-7a`
    - `Authorization`: `Bearer {{USER_TOKEN}}` (Obtained after login)
    - `Content-Type`: `application/json`

---

## 1. Authentication

### Login (Sign In with Password)
- **POST** `https://wgwceabdmkibawivuirc.supabase.co/auth/v1/token?grant_type=password`
- **Body**:
```json
{
  "email": "admin@bsw.com",
  "password": "your_password"
}
```
- **Note**: Copy the `access_token` from the response to use in the `Authorization` header for other requests.

---

## 2. Employee Management

### Get All Employees
- **GET** `{{URL}}/employees?select=*&order=created_at.desc`

### Add New Employee
- **POST** `{{URL}}/employees`
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
- **DELETE** `{{URL}}/employees?id=in.("uuid1","uuid2")`

---

## 3. Scheduler

### Get Schedule
- **GET** `{{URL}}/schedule?select=*&employee_id=in.("uuid1","uuid2")`

### Upsert Schedule (Save/Update)
- **POST** `{{URL}}/schedule`
- **Headers**: `Prefer: resolution=merge-duplicates`
- **Body**:
```json
[
  {
    "employee_id": "uuid1",
    "day_date": "2026-03-12",
    "is_off": false,
    "is_required_off": false,
    "is_manual_off": false
  }
]
```
