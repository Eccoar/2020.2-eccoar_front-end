import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RegisterEmail from '../../../pages/Register/RegisterEmail';
import api from '../../../services/api';

const mockHistoryPush = jest.fn();
const mockReactRouterDom = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof mockReactRouterDom),
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
	test('test screen history', async () => {
		const mockApi = jest.fn();
		jest.spyOn(api, 'post').mockImplementationOnce(mockApi);
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
			target: { value: '123456' },
		});

		await fireEvent.click(screen.getByText('CONTINUAR'));
		expect(mockApi).toBeCalledTimes(1);
	});

	test('test error history', async () => {
		jest.mock('history');
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.reject(Error),
		);
		const consoleSpy = jest.spyOn(console, 'log');

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
			target: { value: '123456' },
		});

		await fireEvent.click(screen.getByText('CONTINUAR'));
		expect(consoleSpy).toHaveBeenCalled();
	});

	test('test  screen history fails', () => {
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<RegisterEmail />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByText('CONTINUAR'));
		expect(
			screen.getByText('Preencha todos os campos corretamente'),
		).toBeInTheDocument();
	});

	test('test  password is too short', () => {
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
		fireEvent.click(screen.getByText('CONTINUAR'));
		expect(screen.getByText('A senha é muito curta!')).toBeInTheDocument();
	});

	test('test  email is wrong', () => {
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<RegisterEmail />
				</Router>
			</MemoryRouter>,
		);
		fireEvent.change(screen.getByTestId('inputEmail') as Element, {
			target: { value: 'gabriel' },
		});
		fireEvent.change(screen.getByTestId('inputPassword') as Element, {
			target: { value: '123456' },
		});
		fireEvent.click(screen.getByText('CONTINUAR'));
		expect(
			screen.getByText('Preencha o email corretamente!'),
		).toBeInTheDocument();
	});

	test('test screen rendering', () => {
		render(<RegisterEmail />);

		expect(screen.getByTestId('RegisterEmail')).toBeInTheDocument();
	});
});
