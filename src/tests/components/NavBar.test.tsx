import { render, fireEvent } from '@testing-library/react';
import NavBar from '../../components/Navbar';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';

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
		expect(queryByTestId('navbar__button')).toBeTruthy();
		expect(queryByAltText('isotipo')).toBeTruthy();
	});
});
