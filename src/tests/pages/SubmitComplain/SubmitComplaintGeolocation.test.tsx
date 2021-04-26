import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SubmitComplaintGeolocation from '../../../pages/SubmitComplain/SubmitComplaintGeolocation';
import * as ReactRouterDom from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof ReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
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
});
