import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SubmitComplaintGeolocation from '../../../pages/SubmitComplain/SubmitComplaintGeolocation';
import GeolocationParser from '../../../utils/geolocation';

const mockHistoryPush = jest.fn();
const mockHistoryReplace = jest.fn();
const mockReactRouterDom = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof mockReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
		replace: mockHistoryReplace,
		location: {
			state: {
				name: 'Feo',
				description: 'Muito gente boa!',
				category: 'Fodao demais',
			},
		},
	}),
}));

jest.mock('../../../utils/geolocation', () => ({
	getPosition: async () => Promise.resolve({ latitude: 0, longitude: 0 }),
}));

jest.mock('leaflet');

describe('Test SubmitComplaintGeolocation screen', () => {
	test('test screen history', () => {
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
		render(<SubmitComplaintGeolocation />);

		expect(
			screen.getByTestId('SubmitComplaintGeolocation'),
		).toBeInTheDocument();
	});

	test('test geolocation position error', async () => {
		jest.spyOn(GeolocationParser, 'getPosition').mockImplementation(() =>
			Promise.reject(Error('erro')),
		);
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<SubmitComplaintGeolocation />
				</Router>
			</MemoryRouter>,
		);

		await waitFor(() => screen.getByText('Continuar'));
		fireEvent.click(screen.getByText('Continuar'));

		expect(mockHistoryReplace).toHaveBeenCalledTimes(1);
	});
});
