import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SubmitComplaitOptionPhoto from '../../../pages/SubmitComplain/SubmitComplaitOptionPhoto';
import * as ReactRouterDom from 'react-router-dom';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useHistory: () => ({
		push: mockHistoryPush,
		location: () => ({ state: '' }),
	}),
}));

describe('Test SubmitComplaintOptionPhoto screen', () => {
	test('test screen history "yes" action', () => {
		jest.mock('history');
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<SubmitComplaitOptionPhoto />
				</Router>
			</MemoryRouter>,
		);
		fireEvent.click(screen.getByText('Sim'));
		expect(mockHistoryPush).toHaveBeenCalledTimes(1);
	});
	test('test screen history "no" action', () => {
		jest.mock('history');
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<SubmitComplaitOptionPhoto />
				</Router>
			</MemoryRouter>,
		);
		fireEvent.click(screen.getByText('Não'));
		expect(mockHistoryPush).toHaveBeenCalledTimes(1);
	});
	test('test screen rendering', () => {
		render(<SubmitComplaitOptionPhoto />);

		expect(
			screen.getByTestId('SubmitComplaintOptionPhoto'),
		).toBeInTheDocument();
	});
});
