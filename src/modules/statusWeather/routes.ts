import { getStatusWeather } from './schema';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import configOpenWeather from '../../config/config';
const axios = require('axios');

export default function statusWeather(server: FastifyInstance, options: FastifyPluginOptions, next) {
	server.get('/:lat/:lon', { schema: getStatusWeather }, async (req, res) => {
		const lat = req.params['lat'];
		const lon = req.params['lon'];
		try {
			const response  = await axios.get(`${configOpenWeather.baseApiUrl}lat=${lat}&lon=${lon}&appid=${configOpenWeather.apiKey}&units=${configOpenWeather.units}`);
			const isHigherThan15Degrees = response.data.main.temp > 15;
			res.send({ isHigherThan15Degrees, city: response.data.name });
		} catch (e) {
			throw new Error(e.response.data.message);
		}
	});
	next();
}
