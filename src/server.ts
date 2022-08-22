import fastify from 'fastify';
const fastifyEnv = require('fastify-env');
import routes from './routes/statusWeather.route';
import { getEnvSchema } from './schemas/env.schema';
import { getOASSchema } from './schemas/oas.schema';

const createServer = () => {
	const server = fastify();

	server.register(require('fastify-cors'));
	server.register(require('./plugins/cache'));
	server.register(require('fastify-oas'), getOASSchema);
	server.register(routes, { prefix: '/status/weather' });

	const options = {
		confKey: 'config',
		schema: getEnvSchema,
		data: process.env
	};

	server.register(fastifyEnv, options)
		.ready((err) => {
			if (err) console.error(err);
		});

	server.setErrorHandler((error, req, res) => {
		req.log.error(error);
		res.send({ error: error.message });
	});

	return server;
};

export default createServer;
