# Todo App API

This project is a RESTful API for managing To-Do items with user authentication. It is built using Node.js, Express.js, and MySQL. The API allows users to register, login, and perform CRUD operations on To-Do items.

## Features

- User Authentication (Register/Login)
- CRUD Operations for To-Do Items

## Technologies Used

- Node.js
- Express.js
- MySQL
- bcryptjs (for password hashing)
- jsonwebtoken (for managing JWTs)
- dotenv (for managing environment variables)

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MySQL installed on your machine or access to a MySQL database
- A tool like Postman for testing the API endpoints

### Create MySQL Database and tables needed for project, run the below sql code 
```sql
CREATE DATABASE todo_app;

use todo_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE todo_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in progress', 'completed') NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
```

### Installation

1. Clone the repository to your local machine:
```
git clone https://yourrepositoryurl.git
```

2. Navigate to the project directory:
```
cd todo-app
```

3. Install the required dependencies:
```
npm install
```

4. Modify the `.env` file in the root directory of the project and correct the following environment variables:
```
PORT=3000
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

5. Start the server:
```
npm start
```

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login a user

### To-Do Items

- **POST /api/todos/**: Create a new To-Do item (Protected)
- **GET /api/todos/**: Get all To-Do items for the logged-in user (Protected)
- **GET /api/todos/:id**: Get a single To-Do item by its ID (Protected)
- **PUT /api/todos/:id**: Update a To-Do item by its ID (Protected)
- **DELETE /api/todos/:id**: Delete a To-Do item by its ID (Protected)