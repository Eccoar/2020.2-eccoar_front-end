import { render, fireEvent, getByTestId } from '@testing-library/react';
import NavBar from '../../components/Navbar';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';

const mockLocation = jest.fn();
const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useLocation: () => ({
		pathname: '/',
	}),
	useHistory: () => ({
		goBack: mockGoBack,
	}),
}));

describe('Navbar com setinha', () => {
	test('renderiza a navBar', () => {
		const { queryByTestId, queryByAltText } = render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<NavBar />
				</Router>
			</MemoryRouter>,
		);
		expect(queryByTestId('arrow')).toBeInTheDocument();
		expect(queryByTestId('navbar__button')).toBeTruthy();
		expect(queryByAltText('isotipo')).toBeTruthy();
	});

	test('History go back', () => {
		const { getByTestId } = render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<NavBar />
				</Router>
			</MemoryRouter>,
		);
		fireEvent.click(getByTestId('arrow'));
		expect(mockGoBack).toHaveBeenCalledTimes(1);
	});
});
