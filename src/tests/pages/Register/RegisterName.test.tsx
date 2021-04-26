import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RegisterName from '../../../pages/Register/RegisterName';
import * as ReactRouterDom from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof ReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('Test Register Name screen', () => {
	test('test screen history', () => {
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<RegisterName />
				</Router>
			</MemoryRouter>,
		);
		fireEvent.change(screen.getByTestId('inputNome') as Element, {
			target: { value: 'Gabriel' },
		});
		fireEvent.change(screen.getByTestId('inputSobrenome') as Element, {
			target: { value: 'Sabanai' },
		});

		fireEvent.click(screen.getByText('CONTINUAR'));
		expect(mockHistoryPush).toBeCalledTimes(1);
	});

	test('test  screen history fails', () => {
		const mockAlert = jest.fn();
		jest.spyOn(window, 'alert').mockImplementation(mockAlert);
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<RegisterName />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByText('CONTINUAR'));
		expect(mockAlert).toBeCalledTimes(1);
	});

	test('test screen rendering', () => {
		render(<RegisterName />);

		expect(screen.getByTestId('RegisterName')).toBeInTheDocument();
	});
});
