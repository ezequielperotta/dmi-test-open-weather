import { statusWeatherService } from '../src/servicies/statusWeather.service';

const axiosMock = require('axios');
jest.mock('axios');

const RIO_CUARTO_LAT ='-33.12957';
const RIO_CUARTO_LON ='-64.356095';

describe('StatusWeatherService', () => {
	test('should return isHigherThan15Degrees = false if Rio Cuarto temperature is lower than 15 degrees', async (done) => {
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

		const response = statusWeatherService(RIO_CUARTO_LAT, RIO_CUARTO_LON);

		await expect(response).resolves.toStrictEqual({ city: 'Río Cuarto', isHigherThan15Degrees: false });
		done();
	});

	test('should return isHigherThan15Degrees = true if Rio Cuarto temperature is higher than 15 degrees', async (done) => {
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

		const response = statusWeatherService(RIO_CUARTO_LAT, RIO_CUARTO_LON);

		await expect(response).resolves.toStrictEqual({ city: 'Río Cuarto', isHigherThan15Degrees: true });
		done();
	});

	test('should return "wrong latitude" if using invalid coordinates' , async (done) => {
		const RIO_CUARTO_INVALID_LAT ='-334444.12957';
		const RIO_CUARTO_INVALID_LON ='-68884.356095';

		axiosMock.get.mockRejectedValueOnce({
			response : {
				data: {
					'cod': '400',
					'message': 'wrong latitude'
				}
			}
		});

		const response = statusWeatherService(RIO_CUARTO_INVALID_LAT, RIO_CUARTO_INVALID_LON);

		await expect(response).rejects.toStrictEqual('wrong latitude');
		done();
	});

});
