const axios = require('axios');
const { getRedisClient } = require('../config/redis');
const { json } = require('express');
require('dotenv').config();

class WeatherModel {
	static async fetchFromAPI(location) {
		try {
			const trimmedLocation = String(location).trim();
			const baseUrl = process.env.BASEURL;
			const apiKey = process.env.APIKEY;
			
			if (!baseUrl || !apiKey) {
				throw new Error('Missing required environment variables: BASEURL or APIKEY');
			}
			
			// Construct the full URL with location
			// Assuming the API expects location as a path parameter
			const fullUrl = `${baseUrl}${encodeURIComponent(trimmedLocation)}`;
			
			const params = {
				unitGroup: 'us',
				key: apiKey,
				contentType: 'json'
			};
			
			console.log(`Making API request to: ${fullUrl}`);
			const apiResponse = await axios.get(fullUrl, { params });
			console.log("Request sent to the API successfully");
			return apiResponse.data;
		} catch (error) {
			console.error('API Error details:', {
				message: error.message,
				status: error.response?.status,
				statusText: error.response?.statusText,
				data: error.response?.data
			});
			throw new Error(`Failed to fetch from API: ${error.message}`);
		}
	}

	static async getFromCache(location) {
		const redisClient = getRedisClient();
		const cacheResult = await redisClient.get(location);

		if (cacheResult) {
			return JSON.parse(cacheResult);
		}
		return null;
	}

	static async saveToCache(location, data, expirationSeconds=180) {
		const redisClient = getRedisClient();
		await redisClient.set(location, JSON.stringify(data), {
			EX: expirationSeconds,
			NX: true
		});
	}

	static async getWeather(location) {
		const cachedData = await this.getFromCache(location);
		if (cachedData) {
			return { 
				cached: true,
				data: cachedData
			}
		}

		const fromAPI = await this.fetchFromAPI(location);
		if (!fromAPI || (Array.isArray(fromAPI) && fromAPI.length === 0)) {
			throw new Error("API returned an empty array");
		}

		await this.saveToCache(location, fromAPI);
		return {
			cached: false,
			data: fromAPI
		}
	}
}

module.exports = WeatherModel;