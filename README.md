# Backend API Project

This repository contains two Node.js REST APIs built with Express.js and Sequelize ORM:

- **my-blog-api**: A blog management API with user authentication and blog post CRUD operations
- **to-do-list-api**: A task management API with user authentication and todo item management

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies for both APIs:
```bash
# Install my-blog-api dependencies
cd my-blog-api
npm install

# Install to-do-list-api dependencies
cd ../to-do-list-api
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in each API directory
   - Configure your database connection and JWT secret

4. Start the development servers:

```bash
# Start my-blog-api (runs on port 3000)
cd my-blog-api
npm run dev

# Start to-do-list-api (runs on port 3001)
cd ../to-do-list-api
npm run dev
```

## 📁 Project Structure

```
backend/
├── .gitignore
├── README.md
├── my-blog-api/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── db/
└── to-do-list-api/
    ├── server.js
    ├── package.json
    ├── src/
    ├── routes/
    ├── controllers/
    └── models/
```

## 🔧 API Details

### my-blog-api

A blog management system with the following features:
- User authentication (JWT)
- Blog post CRUD operations
- User management
- MySQL database with Sequelize ORM

**Port**: 3000

**Key Dependencies**:
- Express.js
- Sequelize ORM
- MySQL2
- JWT authentication
- CORS support

### to-do-list-api

A task management system with the following features:
- User authentication (JWT)
- Todo item CRUD operations
- User management
- Input validation with Joi
- MySQL database with Sequelize ORM

**Port**: 3001

**Key Dependencies**:
- Express.js
- Sequelize ORM
- MySQL2
- JWT authentication
- Joi validation
- CORS support

## 🛠️ Development

### Available Scripts

Both APIs support the following npm scripts:

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if configured)
```

**to-do-list-api additional scripts**:
```bash
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
```

### Environment Variables

Create a `.env` file in each API directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000  # or 3001 for to-do-list-api
NODE_ENV=development
```

## 📚 API Documentation

### Authentication Endpoints

Both APIs use JWT authentication with the following endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (protected)

### Protected Routes

Most endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 🗄️ Database Setup

1. Create MySQL databases for each API
2. Run database migrations (if configured)
3. Ensure proper database permissions

## 🧪 Testing

Both APIs include basic test configurations. Run tests with:
```bash
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

For questions or issues, please open an issue in the repository or contact the development team.

---

**Note**: Make sure to configure your database connections and environment variables before running the APIs.
