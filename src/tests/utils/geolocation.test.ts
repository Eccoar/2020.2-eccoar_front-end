import GeolocationParser from '../../utils/geolocation';

test('testing geolocation', async () => {
	const mockGeolocation = {
		getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
			Promise.resolve(
				success({
					coords: {
						latitude: 51.1,
						longitude: 45.3,
					},
				}),
			),
		),
	};
	// @ts-expect-error geolocation must be mocked to be used during testing
	global.navigator.geolocation = mockGeolocation;

	const position = await GeolocationParser.getPosition();

	expect(position).toStrictEqual({ latitude: 51.1, longitude: 45.3 });
});
