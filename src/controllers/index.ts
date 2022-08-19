import { getStatusWeatherSchema } from '../schemas/statusWeather';
import { statusWeatherService } from '../servicies';

export const statusWeatherController = {
	schema: getStatusWeatherSchema,
	handler: async (req, res) => {
		const lat = req.query.lat;
		const lon = req.query.lon;
		try {
			const response  = await statusWeatherService(lat, lon);
			res.send(response);
		} catch (e) {
			throw new Error(e);
		}
	},
};