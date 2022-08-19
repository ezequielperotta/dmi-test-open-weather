import fastify from 'fastify';

import statusWeather from './modules/statusWeather/routes';

function createServer() {
	const server = fastify();
	server.register(require('fastify-cors'));

	server.register(require('fastify-oas'), {
		routePrefix: '/docs',
		exposeRoute: true,
		swagger: {
			info: {
				title: 'DMI Weather status API',
				description: 'Api documentation for check weather status ',
				version: '1.0.0'
			},
			servers: [
				{ url: 'http://localhost:3000', description: 'development' },
			],
			schemes: ['http'],
			consumes: ['application/json'],
			produces: ['application/json'],
		}
	});

	server.register(statusWeather, { prefix: '/status/weather' });

	server.setErrorHandler((error, req, res) => {
		req.log.error(error);
		res.send({ error: error.message });
	});

	return server;
}

export default createServer;