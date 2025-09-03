const express = require('express');
const cors = require('cors');
const loges = require('morgan');
const dotenv = require('dotenv');

const {connectDB} = require('./db/db');
const blogsRoutes = require('./routes/articleRoutes');
dotenv.config();

// Init app
const app = express();

// connect to database
connectDB();

// Middleware
app.use(cors());
app.use(loges('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api/blogs', blogsRoutes)

// main route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to Blog API CRUD API with Express, MySQL, and Sequelize'});
});


// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})