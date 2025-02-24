\documentclass[12pt]{article}

\usepackage{graphicx}
\usepackage{geometry}
\geometry{a4paper}

\title{Task Management Application - README}
\author{}
\date{}

\begin{document}

\maketitle

\section*{Overview}
This document provides a detailed guide on setting up and running the Task Management application. The application allows users to register, log in, and manage tasks. The stack used for this project includes:
\begin{itemize}
    \item Backend: Node.js with Express and TypeScript
    \item Frontend: React with TypeScript
    \item Database: PostgreSQL
\end{itemize}

\section*{Setup Instructions}

\subsection*{1. Database Setup}

\subsubsection*{1.1. Install PostgreSQL}
First, ensure that PostgreSQL is installed on your machine. You can download and install PostgreSQL from the official website: \url{https://www.postgresql.org/download/}.

\subsubsection*{1.2. Create a Database}
After installing PostgreSQL, open the PostgreSQL shell or use a database management tool like pgAdmin to create a new database for the application. Execute the following SQL command:

\begin{verbatim}
CREATE DATABASE task_management;
\end{verbatim}

\subsubsection*{1.3. Create Tables}
The database requires two tables: \texttt{users} and \texttt{tasks}. You can run the following SQL script to create them:

\begin{verbatim}
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
\end{verbatim}

\subsubsection*{1.4. Database Migrations (Optional)}
For a more automated approach, you can use a migration tool such as \texttt{node-pg-migrate}. However, this step is optional, and you can manually execute the SQL script provided above.

\subsection*{2. Backend Setup}

\subsubsection*{2.1. Install Dependencies}
Navigate to the backend directory and install the required dependencies:

\begin{verbatim}
npm install
\end{verbatim}

\subsubsection*{2.2. Environment Variables}
Create a \texttt{.env} file in the root of your backend project with the following variables:

\begin{verbatim}
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/task_management
JWT_SECRET=your_jwt_secret_here
\end{verbatim}

Replace \texttt{username} and \texttt{password} with your PostgreSQL credentials and choose a secure \texttt{JWT\_SECRET} for signing JWT tokens.

\subsubsection*{2.3. Run the Backend}
To run the backend server, use the following command:

\begin{verbatim}
npm run dev
\end{verbatim}

This will start the server on port 5000 (or any port specified in the \texttt{.env} file).

\subsection*{3. Frontend Setup}

\subsubsection*{3.1. Install Dependencies}
Navigate to the frontend directory and install the required dependencies:

\begin{verbatim}
npm install
\end{verbatim}

\subsubsection*{3.2. Run the Frontend}
To run the frontend development server, use the following command:

\begin{verbatim}
npm start
\end{verbatim}

This will start the frontend on \texttt{http://localhost:3000}. Ensure that the backend server is running as well to allow frontend-backend communication.

\subsection*{4. Frontend Features}
The frontend allows users to:
\begin{itemize}
    \item Register a new user
    \item Log in with an existing user account
    \item Create, update, and delete tasks
\end{itemize}

All task management functionalities are secured and require an authenticated user to access.

\subsection*{5. Testing}
To ensure that the application works as expected, the following tests should be performed:

\subsubsection*{5.1. Backend Testing}
You can use tools like \texttt{Postman} or \texttt{cURL} to test the API endpoints:
\begin{itemize}
    \item \texttt{POST /auth/register}: Registers a new user.
    \item \texttt{POST /auth/login}: Logs in the user and returns a JWT token.
    \item \texttt{GET /tasks}: Fetches all tasks for the authenticated user.
    \item \texttt{POST /tasks}: Creates a new task.
    \item \texttt{PUT /tasks/:id}: Updates a task (e.g., mark complete, edit).
    \item \texttt{DELETE /tasks/:id}: Deletes a task.
\end{itemize}

\subsubsection*{5.2. Frontend Testing}
- Test the registration and login forms to ensure that users can sign up and log in successfully.
- Test the task management functionalities to ensure tasks can be created, updated, and deleted.

Verify that all interactions between the frontend and backend are working as expected by checking network requests in the browser's developer tools.

\section*{Salary Expectations}

Based on the complexity of this project and the skill set required, the following monthly salary expectations are typical:

\begin{itemize}
    \item \textbf{Entry-level (0-2 years experience)}: \$4,000 - \$5,500 per month
    \item \textbf{Mid-level (2-5 years experience)}: \$5,500 - \$8,000 per month
    \item \textbf{Senior-level (5+ years experience)}: \$8,000 - \$12,000 per month
\end{itemize}

Given the required skills in backend development (Node.js, PostgreSQL, JWT) and frontend development (React, TypeScript), a rate of \textbf{more than \$25/hour} is considered reasonable, depending on experience and location.

\end{document}
