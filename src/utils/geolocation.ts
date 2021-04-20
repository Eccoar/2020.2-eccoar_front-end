export default class GeolocationParser {
	static getPosition = async () => {
		const permission = await navigator.permissions.query({
			name: 'geolocation',
		});
		if (permission.state === 'denied') {
			throw new Error('O GPS do dispositivo não está acionado');
		}
		const pos: GeolocationPosition = await new Promise(
			(resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			},
		);
		return {
			latitude: pos.coords.latitude,
			longitude: pos.coords.longitude,
		};
	};
}
