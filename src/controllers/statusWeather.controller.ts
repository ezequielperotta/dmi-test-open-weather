import { getStatusWeatherSchema } from '../schemas/statusWeather.schema';
import { statusWeatherService } from '../servicies/statusWeather.service.';

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