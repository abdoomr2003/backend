const WeatherModel = require('../models/weatherModel');

class WeatherController {
    static async getWeatherData(req, res) {
        const location = req.params.location;

        try {
            const weatherData = await WeatherModel.getWeather(location);

            res.status(200).json(weatherData)
        } catch (error) {
            console.error("Controller error:", error);
            res.status(404).json({ 
                error: "Data unavailable",
                message: error.message 
            });
        }
    }
}

module.exports = WeatherController;