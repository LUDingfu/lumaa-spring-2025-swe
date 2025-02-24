## Overview

This document provides a detailed guide on setting up and running the Task Management application. The application allows users to register, log in, and manage tasks. The stack used for this project includes:

- **Backend**: Node.js with Express and TypeScript
- **Frontend**: React with TypeScript
- **Database**: PostgreSQL

## Setup Instructions

### 1. Database Setup

#### 1.1. Install PostgreSQL

First, ensure that PostgreSQL is installed on your machine.

#### 1.2. Create a Database

After installing PostgreSQL, open the PostgreSQL shell or use a database management tool like pgAdmin to create a new database for the application. Execute the following SQL command:

```sql
CREATE DATABASE task_management;
```

#### 1.3. Create Tables

The database requires two tables: `users` and `tasks`. You can run the following SQL script to create them:

```sql
-- users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  isComplete BOOLEAN DEFAULT FALSE,
  userId INTEGER REFERENCES users(id) ON DELETE CASCADE
);
```

#### 1.4. Database Migrations

For a  automated approach, use a migration tool: `node-pg-migrate`. 

### 2. Backend Setup

#### 2.1. Install Dependencies

Navigate to the backend directory and install the required dependencies:

```bash
npm install
```

#### 2.2. Environment Variables

Create a `.env` file in the root of your backend project with the following variables:

```plaintext
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/task_management
JWT_SECRET=your_jwt_secret
```

Replace `username` and `password` with your PostgreSQL credentials and choose a secure `JWT_SECRET` for signing JWT tokens.

#### 2.3. Run the Backend

To run the backend server, use the following command:

```bash
npm run dev
```

This will start the server on port 5000 (or any port specified in the `.env` file).

### 3. Frontend Setup

#### 3.1. Install Dependencies

Navigate to the frontend directory and install the required dependencies:

```bash
npm install
```

#### 3.2. Run the Frontend

To run the frontend development server, use the following command:

```bash
npm start
```

This will start the frontend on `http://localhost:3000`. Ensure that the backend server is running as well to allow frontend-backend communication.

### 4. Frontend Features

The frontend allows users to:

- Register a new user
- Log in with an existing user account
- Create, update, and delete tasks

All task management functionalities are secured and require an authenticated user to access.

### 5. Testing

Tests is to ensure that the application works as expected.

#### 5.1. Backend Testing

Use tool:  `Postman` to test the API endpoints:

- `POST /auth/register`: Registers a new user.
- `POST /auth/login`: Logs in the user and returns a JWT token.
- `GET /tasks`: Fetches all tasks for the authenticated user.
- `POST /tasks`: Creates a new task.
- `PUT /tasks/:id`: Updates a task (e.g., mark complete, edit).
- `DELETE /tasks/:id`: Deletes a task.

#### 5.2. Frontend Testing

- Test the registration and login forms to ensure that users can sign up and log in successfully.
- Test the task management functionalities to ensure tasks can be created, updated, and deleted.

Verify that all interactions between the frontend and backend are working as expected by checking network requests in the browser.

## Salary Expectations

**more than 25/hour**
