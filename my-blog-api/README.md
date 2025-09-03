# My Blog API

A RESTful API for blog management built with Node.js, Express.js, and Sequelize ORM. This API provides endpoints for user authentication, blog post management, and user administration.

## 🚀 Features

- **User Authentication**: JWT-based authentication system
- **Blog Management**: Full CRUD operations for blog posts
- **User Management**: User registration, login, and profile management
- **Database**: MySQL database with Sequelize ORM
- **Security**: Password hashing, JWT tokens, and CORS support

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Built-in validation
- **Development**: Nodemon for hot reloading

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

## 🔧 Installation

1. **Clone and navigate to the project**:
```bash
cd my-blog-api
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
DB_NAME=blog_db
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=development
```

4. **Database Setup**:
   - Create a MySQL database named `blog_db`
   - The API will automatically create tables on first run

5. **Start the server**:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | User registration | `{ "username", "email", "password" }` |
| `POST` | `/auth/login` | User login | `{ "email", "password" }` |
| `GET` | `/auth/profile` | Get user profile | Requires JWT token |

### Blog Posts

| Method | Endpoint | Description | Body | Auth Required |
|--------|----------|-------------|------|---------------|
| `GET` | `/posts` | Get all posts | - | No |
| `GET` | `/posts/:id` | Get post by ID | - | No |
| `POST` | `/posts` | Create new post | `{ "title", "content" }` | Yes |
| `PUT` | `/posts/:id` | Update post | `{ "title", "content" }` | Yes |
| `DELETE` | `/posts/:id` | Delete post | - | Yes |

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
my-blog-api/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (create this)
├── routes/           # API route definitions
├── controllers/      # Business logic handlers
├── models/           # Database models
└── db/              # Database configuration
```

## 🚀 Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if configured)
```

## 🗄️ Database Schema

The API automatically creates the following tables:

- **Users**: `id`, `username`, `email`, `password`, `createdAt`, `updatedAt`
- **Posts**: `id`, `title`, `content`, `userId`, `createdAt`, `updatedAt`

## 🔒 Security Features

- Password hashing using bcrypt
- JWT token authentication
- CORS protection
- Input validation
- SQL injection protection via Sequelize

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📝 Example Usage

### Register a new user
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Create a blog post (with authentication)
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post."
  }'
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify MySQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**:
   - Change PORT in `.env` file
   - Kill process using the port: `lsof -ti:3000 | xargs kill -9`

3. **JWT Token Issues**:
   - Verify JWT_SECRET is set in `.env`
   - Check token expiration
   - Ensure token is included in Authorization header

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Note**: Remember to never commit your `.env` file or expose sensitive information like JWT secrets.
