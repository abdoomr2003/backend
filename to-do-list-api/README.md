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
DB_HOSTNAME=localhost
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=todo_db
DB_PORT=3306

# JWT Configuration
JWT_KEY=your_super_secret_jwt_key_here

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
| `POST` | `/api/users/register` | User registration | `{ "username", "password", "confirmedPassword" }` |
| `POST` | `/api/users/login` | User login | `{ "username", "password" }` |

### Todo Items

| Method | Endpoint | Description | Body | Auth Required |
|--------|----------|-------------|------|---------------|
| `GET` | `/api/tasks` | Get all tasks for user | - | Yes |
| `GET` | `/api/tasks/:id` | Get task by ID | - | Yes |
| `POST` | `/api/tasks` | Create new task | `{ "title", "description", "status" }` | Yes |
| `PUT` | `/api/tasks/:id` | Update task | `{ "title", "description", "status" }` | Yes |
| `DELETE` | `/api/tasks/:id` | Delete task | - | Yes |

### Users

| Method | Endpoint | Description | Body | Auth Required |
|--------|----------|-------------|------|---------------|
| `GET` | `/api/users` | Get all users | - | No |
| `GET` | `/api/users/:id` | Get user by ID | - | No |
| `PUT` | `/api/users/:id` | Update user | `{ "username", "password" }` | No |
| `DELETE` | `/api/users/:id` | Delete user | - | No |

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

1. Register a new user at `POST /api/users/register`
2. Login at `POST /api/users/login` to receive a JWT token
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

- **Users**: `id`, `username`, `password`, `createdAt`, `updatedAt`
- **Tasks**: `id`, `title`, `description`, `status`, `userId`, `createdAt`, `updatedAt`

### Task Status Options
- `pending`: Task is waiting to be started
- `in_progress`: Task is currently being worked on
- `completed`: Task has been finished

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
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane_doe",
    "password": "SecurePass123!",
    "confirmedPassword": "SecurePass123!"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane_doe",
    "password": "SecurePass123!"
  }'
```

### Create a task (with authentication)
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending"
  }'
```

### Update task status
```bash
curl -X PUT http://localhost:3001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "status": "completed"
  }'
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
