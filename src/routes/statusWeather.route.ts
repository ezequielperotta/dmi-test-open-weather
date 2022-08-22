import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { statusWeatherController } from '../controllers/statusWeather.controller';
import { getStatusWeatherSchema } from '../schemas/statusWeather.schema';

export default function statusWeather(server: FastifyInstance, options: FastifyPluginOptions, next) {
	server.get('/', getStatusWeatherSchema, statusWeatherController);
	next();
}