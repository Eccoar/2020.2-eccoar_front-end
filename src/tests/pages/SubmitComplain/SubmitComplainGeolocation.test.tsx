import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SubmitComplaintGeolocation from '../../../pages/SubmitComplain/SubmitComplaintGeolocation';

export const mockNavigatorGeolocation = () => {
	const clearWatchMock = jest.fn();
	const getCurrentPositionMock = jest
		.fn()
		.mockImplementation((success) =>
			Promise.resolve(success({ coords: { latitude: 0, longitude: 0 } })),
		);
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

jest.mock('leaflet');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('Test SubmitComplaintGeolocation screen', () => {
	test('test screen history', () => {
		mockNavigatorGeolocation();
		jest.mock('history');
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<SubmitComplaintGeolocation />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByText('Continuar'));
		expect(mockHistoryPush).toHaveBeenCalledTimes(1);
	});
	test('test screen rendering', () => {
		mockNavigatorGeolocation();
		render(<SubmitComplaintGeolocation />);

		expect(
			screen.getByTestId('SubmitComplaintGeolocation'),
		).toBeInTheDocument();
	});
});
