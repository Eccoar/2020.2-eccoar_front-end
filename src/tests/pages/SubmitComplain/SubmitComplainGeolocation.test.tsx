import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SubmitComplaintGeolocation from '../../../pages/SubmitComplain/SubmitComplaintGeolocation';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('Test SubmitComplaintGeolocation screen', () => {
	test('test screen history', () => {
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
		render(<SubmitComplaitPhoto />);

		expect(
			screen.getByTestId('SubmitComplaintGeolocation'),
		).toBeInTheDocument();
	});
});
