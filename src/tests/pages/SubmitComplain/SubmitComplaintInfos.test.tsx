import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SubmitComplaintInfos from '../../../pages/SubmitComplain/SubmitComplaintInfos';
import * as ReactRouterDom from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof ReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('Test SubmitComplaintInfos screen', () => {
	test('test screen history', () => {
		jest.mock('history');
		const { container } = render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<SubmitComplaintInfos />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.change(container.querySelector('input') as Element, {
			target: { value: 'Buraco na rua' },
		});
		fireEvent.change(container.querySelector('textarea') as Element, {
			target: { value: 'descrição do buracao' },
		});
		fireEvent.change(container.querySelector('select') as Element, {
			target: { value: 'Buraco' },
		});

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
