# 🚀 Task Management API

A RESTful Task Management API built with Node.js, Express, Prisma ORM, MySQL, JWT Authentication, and BCrypt.

This project demonstrates backend development fundamentals including authentication, authorization, CRUD operations, filtering, searching, pagination, and task ownership.

---

## 📌 Features

### Authentication

* User Registration
* User Login
* Password Hashing with BCrypt
* JWT Authentication

### Authorization

* Users can only access their own tasks
* Protected Routes using JWT Middleware

### Task Management

* Create Task
* Get All Tasks
* Get Task By ID
* Update Task
* Delete Task

### Task Status

* Toggle Task Completion
* Completed / Incomplete Tasks

### Priority System

* Low
* Medium
* High

### Filtering

Filter tasks by:

* Completion Status
* Priority

Examples:

```http
GET /tasks?completed=true
GET /tasks?priority=High
```

### Search

Search tasks by title:

```http
GET /tasks?search=prisma
```

### Pagination

```http
GET /tasks?page=1&limit=5
```

### Error Handling

* Validation Errors
* Authentication Errors
* Authorization Errors
* Internal Server Errors

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Prisma ORM
* MySQL
* JWT
* BCrypt
* Postman

---

## 📂 Database Schema

### User

| Field    | Type   |
| -------- | ------ |
| id       | Int    |
| username | String |
| password | String |

### Task

| Field     | Type     |
| --------- | -------- |
| id        | Int      |
| title     | String   |
| completed | Boolean  |
| priority  | String   |
| createdAt | DateTime |
| userId    | Int      |

---

## 🔐 Authentication

Login endpoint returns a JWT token.

```http
POST /login
```

Example Response:

```json
{
  "token": "your-jwt-token"
}
```

Use the token:

```http
Authorization: Bearer YOUR_TOKEN
```

---

## 📖 API Endpoints

### Auth

| Method | Endpoint  |
| ------ | --------- |
| POST   | /register |
| POST   | /login    |

### Tasks

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /tasks            |
| GET    | /tasks/:id        |
| POST   | /tasks            |
| PUT    | /tasks/:id        |
| DELETE | /tasks/:id        |
| PATCH  | /tasks/:id/toggle |

---

## 🔍 Query Parameters

### Search

```http
GET /tasks?search=jwt
```

### Filter Completed

```http
GET /tasks?completed=true
```

### Filter Priority

```http
GET /tasks?priority=High
```

### Pagination

```http
GET /tasks?page=1&limit=10
```

---

## 🚦 Getting Started

Install dependencies:

```bash
npm install
```

Configure environment variables:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Run migration:

```bash
npx prisma migrate dev
```

Start server:

```bash
npm run dev
```

---

## 🎯 Learning Objectives

This project was built to practice:

* REST API Development
* Authentication & Authorization
* Prisma ORM
* Relational Database Design
* Query Filtering
* Search Functionality
* Pagination
* Error Handling
* Backend Best Practices

---

## 👨‍💻 Author

Built by Ilham as a backend development learning project.
