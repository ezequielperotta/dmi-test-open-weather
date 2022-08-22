import { statusWeatherService } from '../servicies/statusWeather.service';

export const statusWeatherController = async (req, res) => {
	try {
		const response  = await statusWeatherService(req.query.lat, req.query.lon);
		res.send(response);
	} catch (e) {
		throw new Error(e);
	}
};