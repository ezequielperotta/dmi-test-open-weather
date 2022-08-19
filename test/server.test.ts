const axios = require('axios');
jest.mock('axios');

describe('Server', () => {
	let server;

	beforeEach(async () => {
		server = await require('../src/index');
		await server.ready();
	});

	afterAll(() => server.close());

	test('/statusWeather returns isHigherThan15Degrees = false', (done) => {
		axios.get.mockResolvedValue({
			data: {
				'coord': {
					'lon': -33.129577,
					'lat': -64.356095
				},
				'main': {
					'temp': 12
				},
				'name': 'Río Cuarto',
			}
		});

		server.inject(
			{
				method: 'GET',
				url: '/status/weather/-33.1425054/-64.351974',
			},
			(err, res) => {
				expect(res.statusCode).toBe(200);
				expect(JSON.parse(res.payload)).toEqual({ isHigherThan15Degrees: false, city: 'Río Cuarto'  });
				done(err);
			}
		);
	});

	test('/statusWeather returns isHigherThan15Degrees = true', (done) => {
		axios.get.mockResolvedValue({
			data: {
				'coord': {
					'lon': -33.129577,
					'lat': -64.356095
				},
				'main': {
					'temp': 19
				},
				'name': 'Río Cuarto',
			}
		});

		server.inject(
			{
				method: 'GET',
				url: '/status/weather/-33.1425054/-64.351974',
			},
			(err, res) => {
				expect(res.statusCode).toBe(200);
				expect(JSON.parse(res.payload)).toEqual({ isHigherThan15Degrees: true, city: 'Río Cuarto'  });
				done(err);
			}
		);
	});

	test('/statusWeather returns status code 500 and wrong latitude as message', (done) => {
		axios.get.mockRejectedValueOnce({
			response : {
				data: {
					'cod': '400',
					'message': 'wrong latitude'
				}
			}
		});

		server.inject(
			{
				method: 'GET',
				url: '/status/weather/-3333333333.1425054/-64.351974',
			},
			(err, res) => {
				expect(res.statusCode).toBe(500);
				expect(JSON.parse(res.payload)).toEqual({ error: 'wrong latitude' });
				done(err);
			}
		);
	});
});
