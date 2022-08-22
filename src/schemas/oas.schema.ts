export const getOASSchema = {
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
};
