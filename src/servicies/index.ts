const axios = require('axios');
require('dotenv').config();

const baseApiUrl = process.env.OPEN_WEATHER_BASE_API_URL;
const apiKey = process.env.OPEN_WEATHER_API_KEY;
const units = process.env.OPEN_WEATHER_UNITS;

export const statusWeatherService = async (lat: string, lon: string): Promise<{ isHigherThan15Degrees: boolean, city: string }> => {
	try {
		const response  = await axios.get(`${baseApiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`);
		console.log('Return value form Open Weather API');
		const isHigherThan15Degrees = response.data.main.temp > 15;
		return ({ isHigherThan15Degrees, city: response.data.name });
	} catch (e) {
		return e.response.data.message;
	}
};
