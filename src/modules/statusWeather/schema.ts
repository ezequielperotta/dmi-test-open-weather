export const getStatusWeather = {
	summary: 'Status Weather',
	description: 'Status weather -> Return true if the temperature is greatste than 15',
	params: {
		type: 'object',
		required: ['lat', 'lon'],
		properties: {
			lat: { type: 'string' },
			lon: { type: 'string' },
		}
	},
	response: {
		200: {
			type: 'object',
			properties: {
				isHigherThan15Degrees: {
					type: 'boolean'
				},
				city: {
					type: 'string'
				}
			}
		}
	}
};
