const express  = require("express");

const WeatherController = require('../controllers/weatherController');
const cacheMiddleware= require('../middleware/cacheMiddleware');

const router = express.Router();

router.get('/:location', cacheMiddleware, WeatherController.getWeatherData);

module.exports = router;
