const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const {connectDB} = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
dotenv.config();
const app = express();
connectDB();


// Middleware 
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Blog API CRUD API with Express, MySQL, and Sequelize'
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})
