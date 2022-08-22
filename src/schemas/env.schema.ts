export const getEnvSchema = {
	type: 'object',
	required: ['OPEN_WEATHER_BASE_API_URL', 'OPEN_WEATHER_API_KEY', 'OPEN_WEATHER_UNITS'],
	properties: {
		OPEN_WEATHER_BASE_API_URL: {
			type: 'string',
			default: 'https://api.openweathermap.org/data/2.5/weather?'
		},
		OPEN_WEATHER_API_KEY: {
			type: 'string',
			default: '50e20a9e809a7b0c83bf99d9a206c7b8'
		},
		OPEN_WEATHER_UNITS: {
			type: 'string',
			default: 'metric'
		},
		PORT: {
			type: 'number',
			default: 3000
		}
	}
};
