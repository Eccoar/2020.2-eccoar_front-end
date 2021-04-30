// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jest.mock('Geolocation', () => ({ getCurrentPosition: jest.fn(), watchPosition: jest.fn() }))

export const mockNavigatorGeolocation = () => {
	const clearWatchMock = jest.fn();
	const getCurrentPositionMock = jest.fn();
	const watchPositionMock = jest.fn();

	const geolocation = {
		clearWatch: clearWatchMock,
		getCurrentPosition: getCurrentPositionMock,
		watchPosition: watchPositionMock,
	};

	Object.defineProperty(global.navigator, 'geolocation', {
		value: geolocation,
	});

	return { clearWatchMock, getCurrentPositionMock, watchPositionMock };
};

const mockGeolocation = {
	navigator: jest.fn(() => ({
		geolocation: jest.fn(() => ({
			getCurrentPosition: jest.fn(() =>
				Promise.resolve({
					latitude: 12.3243,
					longitude: 43.324234,
				}),
			),
			watchPosition: jest.fn(),
		})),
	})),
};
global.navigator = { geolocation: mockGeolocation } as any;
