# 🛠️ Voucher App Backend

This is the **backend API** for a collaborative voucher management application. Built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, it supports full **JWT authentication**, **role-based access control**, **data validation** using **Zod**.

---

## 🚀 Features

- 🔐 **Authentication**
  - JWT-based login & signup
  - Role-based access (e.g., user, admin)

- 🧾 **Voucher API**
  - Create, read, update, delete (CRUD) endpoints
  - issue vouchers to users
 
  - - 🧾 **Database SEEDING**
    - seeding admin and user details manage database

- ✅ **Validation & Middleware**
  - Zod-based request validation
  - Global error handler
  - Centralized async error wrapper
  - Custom middleware for auth, roles, and 404 routes


---

## 🧪 Tech Stack

| Tech         | Description                        |
|--------------|------------------------------------|
| Node.js      | JavaScript runtime                 |
| Express.js   | Web framework                      |
| TypeScript   | Type safety                        |
| MongoDB      | Database                           |
| Mongoose     | MongoDB ODM                        |           |
| Zod          | Runtime schema validation          |
| JSON Web Token (JWT) | Auth & authorization      |

---

## 📂 Project Structure

src/
├── config/ # DB and env config
├── controllers/ # Business logic for routes
├── middleware/ # Auth, error, and validation middleware
├── models/ # Mongoose models
├── routes/ # Express route handlers
├── services/ # Reusable business logic
├── seed/ # Seeding data to database
├── sockets/ # Socket.IO event handling
├── utils/ # Utility functions (e.g., token, logger)
├── validations/ # Zod schemas
├── app.ts # Express app setup
└── server.ts # Server entry point


---

## 🧾 Available API Routes

## 📦 Getting Started

### 1. Clone the Repo


git clone https://github.com/your-username/notes-backend.git
cd notes-backend

### 2. Install Dependencies

npm install

### 3 . Run the Development Server

npm run dev


⚡ Real-time Collaboration
Socket.IO is integrated to allow real-time updates when multiple users are editing the same note.

Socket events are namespaced and structured for performance and scalability.

Events emit from the backend when note data changes (e.g., "note-updated", "note-deleted").

🛡️ Middlewares
authMiddleware – Verifies JWT

roleMiddleware – Role-based access control

validateRequest – Zod validation middleware

errorHandler – Centralized error response

notFound – 404 middleware

🧪 Testing
You can use tools like Postman, Insomnia, or cURL to test the REST APIs.

Test Cases:

✅ User auth

✅ Invalid Token Access

✅ CRUD operations on vouchers




