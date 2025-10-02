const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const weatherRoutes = require('./src/routes/weatherRoutes');
const { initClient } = require('./src/config/redis')

dotenv.config({
    path: '/root/repo/backend/backend/weather-api-wrapper-service/.env'
});
const app = express();

//Middleware 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes

app.use('/api/v1/weather', weatherRoutes);
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Blog API CRUD API with Express, MySQL, and Sequelize'
    });
});


const port =  process.env.PORT || 3000;
(async () => {
    try {
        await initClient();

        app.listen(port, () => {
            console.log(`server is runnig on ${port}`)
        })
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
})()