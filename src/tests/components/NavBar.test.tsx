import { render, fireEvent } from '@testing-library/react';
import NavBar from '../../components/Navbar';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';

const mockUseLocation = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useLocation: () => ({
		push: mockUseLocation,
	}),
}));

const mockHistoryGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useHistory: () => ({
		location: mockHistoryGoBack,
	}),
}));

describe('Navbar', () => {
	test('renderizar a navBar', () => {
		const { queryByTestId, queryByAltText } = render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<NavBar />
				</Router>
			</MemoryRouter>,
		);

		expect(queryByTestId('navbar__button')).toBeTruthy();
		expect(queryByAltText('arrowImg')).toBeTruthy();
		expect(queryByAltText('isotipo')).toBeTruthy();
	});

	// test('trigger Onclick', () => {
	// 	jest.mock('history');
	// 	const { queryByAltText } = render(
	// 		<MemoryRouter>
	// 			<Router history={createMemoryHistory()}>
	// 				<NavBar />
	// 			</Router>
	// 		</MemoryRouter>,
	// 	);

	// 	fireEvent.click(queryByAltText('arrowImg'));
	// 	expect(mockHistoryGoBack).toHaveBeenCalled();
	// });
});
