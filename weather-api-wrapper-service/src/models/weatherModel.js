const axios = require('axios');
const { getRedisClient } = require('../config/redis');
const { json } = require('express');
require('dotenv').config();

class WeatherModel {
    static async fetchFromAPI(location) {
        try {
            const trimmedLocation = String(location).trim();
            const baseUrl = process.env.BASEURL;
            const apiKey = process.env.APIKEY || process.env.APPID || process.env.WEATHER_API_KEY;

            const isOpenWeather = /openweathermap/i.test(String(baseUrl));
            const isWeatherApi = /weatherapi\.com/i.test(String(baseUrl));

            const params = { q: trimmedLocation };
            if (isOpenWeather) {
                params.appid = apiKey;
            } else {
                params.key = apiKey;
                params.aqi = 'no';
            }

            const apiResponse = await axios.get(`${baseUrl}`, { params });
            console.log("Request sent to the API");
            return apiResponse.data;
        } catch (error) {
            throw new Error(`Failed to fetch from API: ${error.message}`);
        }
    }

    static async getFromCash(location) {
        const redisClient = getRedisClient();
        const cacheResult = await redisClient.get(location);

        if (cacheResult) {
            return JSON.parse(cacheResult);
        }
        return null;
    }

    static async saveToCash(location, data, expirationSeconds=180) {
        const redisClient = getRedisClient();
        await redisClient.set(location, JSON.stringify(data), {
            EX: expirationSeconds,
            NX: true
        });
    }

    static async getWeather(location) {
        const cashedData = await this.getFromCash(location);
        if (cashedData) {
            return { 
                cashed: true,
                data: cashedData
            }
        }

        const fromAPI = await this.fetchFromAPI(location);
        if (!fromAPI || (Array.isArray(fromAPI) && fromAPI.length === 0)) {
            throw new Error("API returned an empty array");
        }

        await this.saveToCash(location, fromAPI);
        return {
            cashed: false,
            data: fromAPI
        }
    }
}

module.exports = WeatherModel;