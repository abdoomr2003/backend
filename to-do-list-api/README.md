# To-Do List API

A comprehensive task management REST API built with Node.js, Express.js, and Sequelize ORM. This API provides robust user authentication, todo item management, and input validation using Joi.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Task Management**: Full CRUD operations for todo items
- **User Management**: User registration, login, and profile management
- **Input Validation**: Comprehensive validation using Joi
- **Database**: MySQL database with Sequelize ORM
- **Security**: Password hashing, JWT tokens, and CORS support
- **Code Quality**: ESLint configuration for consistent code style

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi with password complexity validation
- **Development**: Nodemon for hot reloading
- **Linting**: ESLint for code quality

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

## 🔧 Installation

1. **Clone and navigate to the project**:
```bash
cd to-do-list-api
```

2. **Install dependencies**:
```bash
npm install
```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=todo_db
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3001
NODE_ENV=development
```

4. **Database Setup**:
   - Create a MySQL database named `todo_db`
   - The API will automatically create tables on first run

5. **Start the server**:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3001`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | User registration | `{ "username", "email", "password" }` |
| `POST` | `/auth/login` | User login | `{ "email", "password" }` |
| `GET` | `/auth/profile` | Get user profile | Requires JWT token |

### Todo Items

| Method | Endpoint | Description | Body | Auth Required |
|--------|----------|-------------|------|---------------|
| `GET` | `/todos` | Get all todos for user | - | Yes |
| `GET` | `/todos/:id` | Get todo by ID | - | Yes |
| `POST` | `/todos` | Create new todo | `{ "title", "description", "dueDate", "priority" }` | Yes |
| `PUT` | `/todos/:id` | Update todo | `{ "title", "description", "dueDate", "priority", "completed" }` | Yes |
| `DELETE` | `/todos/:id` | Delete todo | - | Yes |
| `PATCH` | `/todos/:id/complete` | Mark todo as complete | - | Yes |

### Users

| Method | Endpoint | Description | Body | Auth Required |
|--------|----------|-------------|------|---------------|
| `GET` | `/users` | Get all users | - | Yes |
| `GET` | `/users/:id` | Get user by ID | - | Yes |
| `PUT` | `/users/:id` | Update user | `{ "username", "email" }` | Yes |
| `DELETE` | `/users/:id` | Delete user | - | Yes |

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

1. Register a new user at `POST /auth/register`
2. Login at `POST /auth/login` to receive a JWT token
3. Use the token in subsequent requests

## 📁 Project Structure

```
to-do-list-api/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (create this)
├── .eslintrc.json    # ESLint configuration
├── .eslintignore     # ESLint ignore patterns
├── eslint.config.mjs # Modern ESLint configuration
├── .sequelizerc.js   # Sequelize configuration
├── src/              # Source code directory
├── routes/           # API route definitions
├── controllers/      # Business logic handlers
├── models/           # Database models
├── requests.http     # HTTP request examples
└── user.http         # User-specific request examples
```

## 🚀 Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if configured)
npm run lint       # Run ESLint to check code quality
npm run lint:fix   # Fix ESLint issues automatically
```

## 🗄️ Database Schema

The API automatically creates the following tables:

- **Users**: `id`, `username`, `email`, `password`, `createdAt`, `updatedAt`
- **Todos**: `id`, `title`, `description`, `dueDate`, `priority`, `completed`, `userId`, `createdAt`, `updatedAt`

### Todo Priority Levels
- `low`: Low priority tasks
- `medium`: Medium priority tasks  
- `high`: High priority tasks

## 🔒 Security Features

- Password hashing using bcryptjs
- JWT token authentication
- CORS protection
- Input validation with Joi
- Password complexity requirements
- SQL injection protection via Sequelize

## ✨ Code Quality

This project includes ESLint configuration for maintaining code quality:

- **ESLint**: Modern JavaScript linting
- **Configuration**: `.eslintrc.json` and `eslint.config.mjs`
- **Ignore Patterns**: `.eslintignore` file
- **Auto-fix**: `npm run lint:fix` to automatically fix issues

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📝 Example Usage

### Register a new user
```bash
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane_doe",
    "email": "jane@example.com",
    "password": "SecurePass123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "SecurePass123!"
  }'
```

### Create a todo item (with authentication)
```bash
curl -X POST http://localhost:3001/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "dueDate": "2024-01-15",
    "priority": "high"
  }'
```

### Mark todo as complete
```bash
curl -X PATCH http://localhost:3001/todos/1/complete \
  -H "Authorization: Bearer <your_jwt_token>"
```

## 📋 Request Examples

The project includes `requests.http` and `user.http` files with ready-to-use HTTP request examples for testing the API endpoints.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify MySQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**:
   - Change PORT in `.env` file
   - Kill process using the port: `lsof -ti:3001 | xargs kill -9`

3. **JWT Token Issues**:
   - Verify JWT_SECRET is set in `.env`
   - Check token expiration
   - Ensure token is included in Authorization header

4. **Validation Errors**:
   - Check request body format
   - Ensure all required fields are provided
   - Verify password meets complexity requirements

5. **ESLint Issues**:
   - Run `npm run lint:fix` to auto-fix issues
   - Check `.eslintrc.json` for configuration
   - Review `.eslintignore` for ignored files

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to ensure code quality
5. Add tests if applicable
6. Submit a pull request

## 🔧 Development Workflow

1. **Code Quality**: Always run `npm run lint` before committing
2. **Auto-fix**: Use `npm run lint:fix` to resolve common issues
3. **Testing**: Ensure all tests pass before submitting changes
4. **Documentation**: Update README.md for any new features

---

**Note**: Remember to never commit your `.env` file or expose sensitive information like JWT secrets. The project includes comprehensive ESLint configuration to maintain code quality standards.
