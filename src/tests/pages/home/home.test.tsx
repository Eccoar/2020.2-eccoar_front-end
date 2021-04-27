import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import Home from '../../../pages/Home';
import api from '../../../services/api';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import * as ReactRouterDom from 'react-router-dom';

const data = [
	{
		complaint_id: 1,
		complaint_name: 'Geno',
		complaint_description: 'Thyroid vessel ligation',
		complaint_latitude: 31.975314,
		complaint_longitude: 35.196042,
		complaint_userId: 1,
		complaint_category: 'Hole',
		complaint_creationDate: '2021-03-12T10:02:31.000Z',
		complaint_closeDate: '2021-11-25T19:05:09.000Z',
		complaint_status: 'open',
		vote_id: null,
		vote_userId: null,
		vote_complaintId: null,
		vote_typeVote: null,
	},
];

const mockHistoryPush = jest.fn();
const mockReactRouterDom = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof mockReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('Home page test', () => {
	beforeEach(() => {
		jest.spyOn(api, 'get').mockImplementationOnce(() =>
			Promise.resolve({ data }),
		);
		jest.spyOn(api, 'post').mockImplementationOnce(() => Promise.resolve());
	});

	test('Render test', async () => {
		render(<Home />);
		await waitFor(() => screen.getByText('Geno'));
		expect(screen.getByText('CRIAR DENÚNCIA')).toBeInTheDocument();
	});

	test('Change page test', async () => {
		render(
			<MemoryRouter>
				<Router history={createMemoryHistory()}>
					<Home />
				</Router>
			</MemoryRouter>,
		);
		userEvent.click(screen.getByText('CRIAR DENÚNCIA'));
		await waitFor(() => screen.getByText('Geno'));
		expect(mockHistoryPush).toHaveBeenCalledTimes(1);
	});

	test('Mock API data test', async () => {
		jest.spyOn(api, 'get').mockImplementation(() =>
			Promise.resolve({ data }),
		);
		render(<Home />);

		const complaintTitle = await waitFor(() => screen.getByText('Geno'));

		expect(complaintTitle).toBeInTheDocument();
	});

	test('Click card test', async () => {
		jest.spyOn(api, 'get').mockImplementation(() =>
			Promise.resolve({ data }),
		);
		jest.spyOn(api, 'post').mockImplementation(() => Promise.resolve());
		act(() => {
			render(<Home />);
		});

		await waitFor(() => screen.getByText('Geno'));
		const complaintButton = screen.getByTestId('button-id');

		act(() => userEvent.click(complaintButton));

		expect(complaintButton).toHaveClass('complaint__upvote--submitted');
	});
});
