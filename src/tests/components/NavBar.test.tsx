import { render, waitFor } from '@testing-library/react';
import NavBar from '../../components/Navbar';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../../context/auth';
import { renderHook } from '@testing-library/react-hooks';
import Login from '../../pages/Login';
import api from '../../services/api';

const mockUseLocation = jest.fn();

const mockHistoryGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useLocation: () => ({
		push: mockUseLocation,
		pathname: '/home',
	}),
	useHistory: () => ({
		location: mockHistoryGoBack,
	}),
}));

describe('Navbar Home', () => {
	test('renderiza a navBar', () => {
		const { queryByTestId, queryByAltText } = render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<NavBar />
				</Router>
			</MemoryRouter>,
		);
		expect(queryByTestId('arrow')).not.toBeInTheDocument();
		expect(queryByTestId('navbar-button')).toBeInTheDocument();
		expect(queryByAltText('isotipo')).toBeInTheDocument();
	});

	test('should open drawer', () => {
		const onClick = jest.fn();
		const { queryByTestId } = render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<NavBar />
				</Router>
			</MemoryRouter>,
		);

		const buttonElement = queryByTestId(
			'navbar-button',
		) as HTMLButtonElement;
		buttonElement.onclick = onClick;
		userEvent.click(buttonElement);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test('should close drawer', () => {
		const onClick = jest.fn();
		const { queryByTestId } = render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<NavBar />
				</Router>
			</MemoryRouter>,
		);
		const buttonElement = queryByTestId(
			'navbar-button',
		) as HTMLButtonElement;
		userEvent.click(buttonElement);

		const closeDrawer = queryByTestId('close-drawer') as HTMLImageElement;
		closeDrawer.onclick = onClick;
		userEvent.click(closeDrawer);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});

describe('Test logout', () => {
	test('should logout', async () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2NrIjoiand0In0.IwCNjXLvxdbyU9JSew9yXMvcQgEjabofy-_1DXo3YpE';
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.resolve({ data: { token }, status: 200 }),
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

		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<AuthProvider>
						<NavBar />
					</AuthProvider>
				</Router>
			</MemoryRouter>,
		);

		const logout = queryByTestId('logout-button') as HTMLElement;
		expect(logout).toBeInTheDocument();
		userEvent.click(logout);
		expect(api.defaults.headers.common['authorization']).toEqual('');
	});
});
