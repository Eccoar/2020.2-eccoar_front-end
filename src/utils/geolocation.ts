export default class GeolocationParser {
	static getPosition = async () => {
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
