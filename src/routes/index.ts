import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { statusWeatherController } from '../controllers';

export default function statusWeather(server: FastifyInstance, options: FastifyPluginOptions, next) {
	server.get('/', statusWeatherController);
	next();
}