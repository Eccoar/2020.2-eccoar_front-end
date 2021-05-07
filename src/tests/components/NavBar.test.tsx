import { render } from '@testing-library/react';
import NavBar from '../../components/Navbar';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

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
