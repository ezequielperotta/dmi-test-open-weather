import fastify from 'fastify';
import routes from './routes';

const createServer = () => {
	const server = fastify();

	server.register(require('fastify-cors'));
	server.register(require('./plugins/cache'));
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

	server.register(routes, { prefix: '/status/weather' });
	
	server.setErrorHandler((error, req, res) => {
		req.log.error(error);
		res.send({ error: error.message });
	});

	return server;
};

export default createServer;
