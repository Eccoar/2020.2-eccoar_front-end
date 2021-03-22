import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SubmitComplaintInfos from '../../../pages/SubmitComplain/SubmitComplaintInfos';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useHistory: () => ({
		push: mockHistoryPush('/submit-complaint/photo', {
			name: '',
			description: '',
			category: '',
		}),
	}),
}));

describe('Test SubmitComplaintInfos screen', () => {
	test('test screen history', () => {
		jest.mock('history');
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<SubmitComplaintInfos />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByText('Continuar'));
		expect(mockHistoryPush).toBeCalledTimes(1);
	});

	test('test  screen history fails', () => {
		jest.spyOn(window, 'alert').mockImplementation(() => ({}));
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<SubmitComplaintInfos />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByText('Continuar'));
		expect(window.alert).toBeCalledTimes(1);
	});

	test('test screen rendering', () => {
		render(<SubmitComplaintInfos />);

		expect(screen.getByTestId('SubmitComplaintInfos')).toBeInTheDocument();
	});
});
