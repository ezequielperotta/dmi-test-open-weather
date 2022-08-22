const axiosMock = require('axios');
jest.mock('axios');

const RIO_CUARTO_LAT ='-33.12957';
const RIO_CUARTO_LON ='-64.356095';

describe('Server', () => {
	let server;

	beforeEach(async () => {
		server = await require('../src/index');
		await server.ready();
	});

	afterAll(() => server.close());

	test('should return isHigherThan15Degrees: false if the HTTP request to /statusWeather and the temperature of Rio Cuarto is lower that 15 degrees', (done) => {
		axiosMock.get.mockResolvedValue({
			data: {
				'coord': {
					'lon': RIO_CUARTO_LAT,
					'lat': RIO_CUARTO_LON
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
				url: '/status/weather?lat=-33.14054&lon=-64.31974',
			},
			(err, res) => {
				expect(res.statusCode).toBe(200);
				expect(JSON.parse(res.payload)).toEqual({ isHigherThan15Degrees: false, city: 'Río Cuarto' });
				done(err);
			}
		);
	});

	test('should return isHigherThan15Degrees: true if the HTTP request to /statusWeather and the temperature of Rio Cuarto is higher that 15 degrees', (done) => {
		axiosMock.get.mockResolvedValue({
			data: {
				'coord': {
					'lon': RIO_CUARTO_LAT,
					'lat': RIO_CUARTO_LON
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
				url: '/status/weather?lat=-33.1425054&lon=-64.351974',
			},
			(err, res) => {
				expect(res.statusCode).toBe(200);
				expect(JSON.parse(res.payload)).toEqual({ isHigherThan15Degrees: true, city: 'Río Cuarto'  });
				done(err);
			}
		);
	});

	test('should return "wrong latitude" if the HTTP request to /statusWeather is called it using invalid coordinates', (done) => {
		axiosMock.get.mockRejectedValueOnce({
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
				url: '/status/weather?lat=-3333333333.1425054&lon=-64.351974',
			},
			(err, res) => {
				expect(res.statusCode).toBe(500);
				expect(JSON.parse(res.payload)).toEqual({ error:'wrong latitude'});
				done(err);
			}
		);
	});
});
