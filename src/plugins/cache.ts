const fastifyPlugin = require('fastify-plugin');
const NodeCache = require('node-cache');
const CACHE_EXPIRED_SECOND = 10;

async function cache(fastify) {
	const cache = new NodeCache();

	cache.on('expired', key => {
		console.log('Cache key expired: ', key);
	});

	fastify.addHook('onRequest', async(request, reply) => {
		if (request.method === 'GET') {
			const response = cache.get(request.url);
			if (response != undefined) {
				console.log('Returning value from cache => ', request.url, 'value =>', response);
				reply
					.code(200)
					.header('Content-Type', 'application/json; charset=utf-8')
					.send(response);
			}
		}
	});

	fastify.addHook('onSend', (request, reply, payload, done) => {
		if (request.method === 'GET') {
			const response = cache.get(request.url);
			if (response == undefined) {
				console.log('Caching response for key => ', request.url, 'value =>', payload);
				cache.set(request.url, payload, CACHE_EXPIRED_SECOND);
			}
		}
		done();
	});
}

module.exports = fastifyPlugin(cache);