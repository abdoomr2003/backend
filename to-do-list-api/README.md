# To-Do List API

A comprehensive RESTful API for managing to-do tasks with user authentication, built with Express.js, MySQL, and Sequelize ORM.

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Task Management**: Full CRUD operations for tasks
- **User Management**: Complete user registration and management
- **Data Validation**: Input validation using Joi schemas
- **Security**: Password complexity requirements, secure token handling
- **Database**: MySQL with Sequelize ORM for robust data management

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: bcryptjs for password hashing
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MySQL server
- npm or yarn package manager

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to-do-list-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   DB_NAME=your_database_name
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   JWT_KEY=your_jwt_secret_key
   PORT=3000
   ```

4. **Database Setup**
   
   Create a MySQL database and update the `.env` file with your database credentials. The application will automatically create tables using Sequelize sync.

5. **Start the application**
   
   For development:
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### User Endpoints

#### Register a new user
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePass123!",
  "confirmedPassword": "SecurePass123!"
}
```

**Password Requirements:**
- Minimum 8 characters, maximum 30 characters
- At least 1 lowercase letter
- At least 1 uppercase letter
- At least 1 number
- At least 1 special character

#### Login user
```http
POST /api/users/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePass123!"
}
```

#### Get all users (Admin)
```http
GET /api/users
```

#### Get user by ID
```http
GET /api/users/:id
```

#### Update user
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "new_username",
  "password": "NewSecurePass123!"
}
```

#### Delete user
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

### Task Endpoints

All task endpoints require authentication.

#### Create a new task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API documentation",
  "status": "in_progress"
}
```

#### Get all tasks (for authenticated user)
```http
GET /api/tasks
Authorization: Bearer <token>
```

#### Get task by ID
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Update task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed"
}
```

#### Delete task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

### Task Status Values
- `pending` (default)
- `in_progress`
- `completed`

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation using Joi schemas
- **Password Complexity**: Enforced strong password requirements
- **User Isolation**: Users can only access their own tasks

## 📊 Database Schema

### Users Table
- `id` (Primary Key, Auto Increment)
- `username` (Unique, Required)
- `password` (Hashed, Required)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Tasks Table
- `id` (Primary Key, Auto Increment)
- `title` (Required, Max 100 chars)
- `description` (Optional, Text)
- `status` (Enum: pending, in_progress, completed)
- `userId` (Foreign Key to Users)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## 🚦 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Human-readable message"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (Validation errors)
- `401`: Unauthorized (Authentication required/invalid)
- `404`: Not Found
- `409`: Conflict (Duplicate resource)
- `500`: Internal Server Error

## 🧪 Testing

Use the provided Postman collection to test all endpoints. Import the `to-do-list-api.postman_collection.json` file into Postman.

### Testing Workflow:
1. Register a new user
2. Login to get JWT token
3. Use the token to create, read, update, and delete tasks
4. Test error scenarios (invalid tokens, validation errors, etc.)

## 📝 Scripts

- `npm start`: Start the production server
- `npm run dev`: Start development server with nodemon
- `npm run lint`: Run ESLint to check code quality
- `npm run lint:fix`: Fix ESLint errors automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the error logs in the console
2. Verify your database connection
3. Ensure all environment variables are set correctly
4. Check that your JWT secret key is secure and consistent

## 🔄 API Versioning

Currently using v1 of the API. Future versions will be indicated in the URL path if needed.

---

**Happy coding! 🎉**