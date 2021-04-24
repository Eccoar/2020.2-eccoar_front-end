import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SubmitComplaitPhoto from '../../../pages/SubmitComplain/SubmitComplaitPhoto';
import * as ReactRouterDom from 'react-router-dom';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useHistory: () => ({
		push: mockHistoryPush,
		location: () => ({ state: '' }),
	}),
}));

describe('Test SubmitComplaintPhoto screen', () => {
	test('test screen rendering', () => {
		render(<SubmitComplaitPhoto />);
		expect(screen.getByTestId('SubmitComplaintPhoto')).toBeInTheDocument();
	});
	test('test screen history', () => {
		jest.mock('history');
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<SubmitComplaitPhoto />
				</Router>
			</MemoryRouter>,
		);
		fireEvent.click(screen.getByText('Continuar'));
		expect(mockHistoryPush).toHaveBeenCalledTimes(1);
	});
});
