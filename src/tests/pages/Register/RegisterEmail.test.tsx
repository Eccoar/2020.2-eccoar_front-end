import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RegisterEmail from '../../../pages/Register/RegisterEmail';
import * as ReactRouterDom from 'react-router-dom';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof ReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
		location: {
			state: {
				cpf: '0485184192',
				cep: '70767080',
				adress: 'Asa Norte',
				name: 'Gabriel',
				lastName: 'Sabanai',
			},
		},
	}),
}));

describe('Test RegisterEmail screen', () => {
	test('test screen history', () => {
		jest.mock('history');
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<RegisterEmail />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.change(screen.getByTestId('inputEmail') as Element, {
			target: { value: 'gabriel@gmail.com' },
		});
		fireEvent.change(screen.getByTestId('inputPassword') as Element, {
			target: { value: '123' },
		});

		// FALTA INTEGRAR COM O BECK
		fireEvent.click(screen.getByText('CONTINUAR'));
		expect(mockHistoryPush).toBeCalledTimes(1);
	});

	test('test  screen history fails', () => {
		jest.spyOn(window, 'alert').mockImplementation(() => ({}));
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<RegisterEmail />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByText('CONTINUAR'));
		expect(window.alert).toBeCalledTimes(1);
	});

	test('test screen rendering', () => {
		render(<RegisterEmail />);

		expect(screen.getByTestId('RegisterEmail')).toBeInTheDocument();
	});
});
