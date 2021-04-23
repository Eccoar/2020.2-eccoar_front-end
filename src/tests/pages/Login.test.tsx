import { render, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../context/auth';
import api from '../../services/api';

const mockHistoryBack = jest.fn();
const mockReactRouterDom = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof mockReactRouterDom),
	useHistory: () => ({
		goBack: mockHistoryBack,
	}),
}));

describe('Login Screen', () => {
	it('Login successfully', async () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2NrIjoiand0In0.IwCNjXLvxdbyU9JSew9yXMvcQgEjabofy-_1DXo3YpE';
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.resolve({ data: { token } }),
		);
		const { queryByTestId, queryAllByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<Router history={createMemoryHistory()}>
						<Login />
					</Router>
				</AuthProvider>
			</MemoryRouter>,
		);

		const [emailInputContainer, passwordInputContainer] = queryAllByTestId(
			'input',
		);
		const emailInput: HTMLInputElement = emailInputContainer
			.children[1] as HTMLInputElement;
		const passwordInput: HTMLInputElement = passwordInputContainer
			.children[1] as HTMLInputElement;
		const loginButton = queryByTestId('button') as HTMLButtonElement;

		userEvent.type(emailInput, 'mockEmail');
		userEvent.type(passwordInput, 'mockPassword');
		await waitFor(() => userEvent.click(loginButton));
		renderHook(() => useAuth());

		expect(loginButton).toBeInTheDocument();
		expect(emailInput.value).toEqual('mockEmail');
		expect(passwordInput.value).toEqual('mockPassword');
	});

	it('Fail to login due to lack of email and passowrd', async () => {
		jest.spyOn(window, 'alert').mockImplementation();
		const { queryByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<Router history={createMemoryHistory()}>
						<Login />
					</Router>
				</AuthProvider>
			</MemoryRouter>,
		);

		const loginButton = queryByTestId('button') as HTMLButtonElement;

		await waitFor(() => userEvent.click(loginButton));
		renderHook(() => useAuth());
		expect(window.alert).toHaveBeenCalled();
	});

	it('Fail to login due to wrong credentials', async () => {
		jest.spyOn(window.console, 'log').mockImplementation();
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: {
						message: {
							message:
								'The password is invalid or the user does not have a password.',
						},
					},
				},
			}),
		);
		const { queryByTestId, queryAllByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<Router history={createMemoryHistory()}>
						<Login />
					</Router>
				</AuthProvider>
			</MemoryRouter>,
		);

		const [emailInputContainer, passwordInputContainer] = queryAllByTestId(
			'input',
		);
		const emailInput: HTMLInputElement = emailInputContainer
			.children[1] as HTMLInputElement;
		const passwordInput: HTMLInputElement = passwordInputContainer
			.children[1] as HTMLInputElement;
		const loginButton = queryByTestId('button') as HTMLButtonElement;

		userEvent.type(emailInput, 'mockEmail');
		userEvent.type(passwordInput, 'mockPassword');
		await waitFor(() => userEvent.click(loginButton));
		renderHook(() => useAuth());

		expect(console.log).toBeCalled();
	});

	it('Fail to login due the user not being verified', async () => {
		jest.spyOn(window.console, 'log').mockImplementation();
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: {
						message: 'User not verified',
					},
				},
			}),
		);
		const { queryByTestId, queryAllByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<Router history={createMemoryHistory()}>
						<Login />
					</Router>
				</AuthProvider>
			</MemoryRouter>,
		);

		const [emailInputContainer, passwordInputContainer] = queryAllByTestId(
			'input',
		);
		const emailInput: HTMLInputElement = emailInputContainer
			.children[1] as HTMLInputElement;
		const passwordInput: HTMLInputElement = passwordInputContainer
			.children[1] as HTMLInputElement;
		const loginButton = queryByTestId('button') as HTMLButtonElement;

		userEvent.type(emailInput, 'mockEmail');
		userEvent.type(passwordInput, 'mockPassword');
		await waitFor(() => userEvent.click(loginButton));
		renderHook(() => useAuth());

		expect(console.log).toBeCalled();
	});

	it('Fail to login due to lack of email and passowrd', async () => {
		jest.spyOn(window, 'alert').mockImplementation();
		const { queryByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<Router history={createMemoryHistory()}>
						<Login />
					</Router>
				</AuthProvider>
			</MemoryRouter>,
		);

		const loginButton = queryByTestId('button') as HTMLButtonElement;

		await waitFor(() => userEvent.click(loginButton));
		renderHook(() => useAuth());
		expect(window.alert).toHaveBeenCalled();
	});
	it('Fail to login due to unknown error', async () => {
		jest.spyOn(window.console, 'log').mockImplementation();
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: {
						message: 'mockedError',
					},
				},
			}),
		);
		const { queryByTestId, queryAllByTestId } = render(
			<MemoryRouter>
				<AuthProvider>
					<Router history={createMemoryHistory()}>
						<Login />
					</Router>
				</AuthProvider>
			</MemoryRouter>,
		);

		const [emailInputContainer, passwordInputContainer] = queryAllByTestId(
			'input',
		);
		const emailInput: HTMLInputElement = emailInputContainer
			.children[1] as HTMLInputElement;
		const passwordInput: HTMLInputElement = passwordInputContainer
			.children[1] as HTMLInputElement;
		const loginButton = queryByTestId('button') as HTMLButtonElement;

		userEvent.type(emailInput, 'mockEmail');
		userEvent.type(passwordInput, 'mockPassword');
		await waitFor(() => userEvent.click(loginButton));
		renderHook(() => useAuth());

		expect(console.log).toBeCalled();
	});
});
