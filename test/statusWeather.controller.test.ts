import { statusWeatherController } from '../src/controllers/statusWeather.controller';

const RIO_CUARTO_LAT ='-33.12957';
const RIO_CUARTO_LON ='-64.356095';
let responseData;
let req;
let mockStatusWeatherService;

describe('StatusWeatherController', () => {
	beforeEach(async () => {
		req = {
			query: {
				lat: RIO_CUARTO_LAT,
				lon: RIO_CUARTO_LON
			}
		};
	});

	test('should return a response isHigherThan15Degrees = true and status 200 if Rio Cuarto temperature is lower than 15 degrees', async (done) => {
		responseData = { isHigherThan15Degrees: false, city: 'Río Cuarto' };
		mockStatusWeatherService = jest.fn().mockResolvedValue(responseData);
		jest.mock('../src/servicies/statusWeather.service', () => mockStatusWeatherService);
		const res = { send: function() { return responseData;}, status: 200};

		await statusWeatherController(req, res);

		await expect(res.send()).toStrictEqual(responseData);
		expect(res.status).toStrictEqual(200);
		done();
	});

	test('should return a response isHigherThan15Degrees = true and status 200 if Rio Cuarto temperature is higher than 15 degrees', async (done) => {
		responseData = { isHigherThan15Degrees: true, city: 'Río Cuarto' };
		mockStatusWeatherService = jest.fn().mockResolvedValue(responseData);
		jest.mock('../src/servicies/statusWeather.service', () => mockStatusWeatherService);
		const res = { send: function() { return responseData;}, status: 200};

		await statusWeatherController(req, res);

		expect(res.send()).toStrictEqual(responseData);
		expect(res.status).toStrictEqual(200);
		done();
	});

	test('should return a response "wrong latitude" and status 200 if Rif using invalid coordinates', async (done) => {
		responseData = 'wrong latitude';
		mockStatusWeatherService = jest.fn().mockResolvedValue(responseData);
		jest.mock('../src/servicies/statusWeather.service', () => mockStatusWeatherService);
		const res = { send: function() { return responseData;}, statusCode: 500};

		await statusWeatherController(req, res);

		expect(res.send()).toStrictEqual(responseData);
		expect(res.statusCode).toStrictEqual(500);
		done();
	});

});
