import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RegisterAdress from '../../../pages/Register/RegisterAdress';

const mockHistoryPush = jest.fn();
const mockReactRouterDom = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof mockReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
		location: {
			state: {
				name: 'Gabriel',
				lastName: 'Sabanai',
			},
		},
	}),
}));

describe('Test SubmitComplaintInfos screen', () => {
	test('test screen history', () => {
		jest.mock('history');
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<RegisterAdress />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.change(screen.getByTestId('inputCPF') as Element, {
			target: { value: '04285184192' },
		});
		fireEvent.change(screen.getByTestId('inputCEP') as Element, {
			target: { value: '70767080' },
		});
		fireEvent.change(screen.getByTestId('inputAdress') as Element, {
			target: { value: 'Asa Norte' },
		});

		fireEvent.click(screen.getByText('CONTINUAR'));
		expect(mockHistoryPush).toBeCalledTimes(1);
	});

	test('test  screen history fails', () => {
		jest.spyOn(window, 'alert').mockImplementation(() => ({}));
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<RegisterAdress />
				</Router>
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByText('CONTINUAR'));
		expect(window.alert).toBeCalledTimes(1);
	});

	test('test screen rendering', () => {
		render(<RegisterAdress />);

		expect(screen.getByTestId('RegisterAdress')).toBeInTheDocument();
	});
});
