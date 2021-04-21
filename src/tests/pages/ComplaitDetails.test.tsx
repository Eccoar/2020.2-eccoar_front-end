import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import api from '../../services/api';
import ComplaintDetails from '../../pages/ComplaintDetails';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const mockHistoryPush = jest.fn();
const mockReactRouterDom = jest.fn();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as typeof mockReactRouterDom),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
	useParams: () => ({
		id: 1,
	}),
}));

function mockComplaint(open: boolean) {
	return {
		data: {
			complaint_id: 1,
			complaint_name: 'Geno',
			complaint_description: 'Thyroid vessel ligation',
			complaint_latitude: 31.975314,
			complaint_longitude: 35.196042,
			complaint_userId: 1,
			complaint_category: 'Hole',
			complaint_creationDate: '2021-03-12T10:02:31.000Z',
			complaint_closeDate: '2021-11-25T19:05:09.000Z',
			complaint_status: open ? 'open' : 'wait',
			vote_id: null,
			vote_userId: null,
			vote_complaintId: null,
			vote_typeVote: null,
		},
	};
}
const complaintWithVoteMock = (status: string) => ({
	complaint_id: 1,
	complaint_name: 'Sub-Ex',
	complaint_description:
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
	complaint_latitude: 36.275231,
	complaint_longitude: 113.310158,
	complaint_userId: 1,
	complaint_category: 'Water',
	complaint_creationDate: '2021-02-21T18:52:45.000Z',
	complaint_closeDate: '2020-11-11T05:41:31.000Z',
	complaint_picture: 'http://dummyimage.com/237x100.png/cc0000/ffffff',
	complaint_status: status,
	vote_id: 405,
	vote_userId: 1,
	vote_complaintId: 7,
	vote_typeVote: 'complaintUpvote',
});

describe('Test ComplaintDetails', () => {
	test('test screen rendering', () => {
		render(<ComplaintDetails />);
		expect(screen.getByTestId('ComplainDetails')).toBeInTheDocument();
	});

	test('test confirm upVote click', async () => {
		jest.spyOn(api, 'get').mockImplementationOnce(() =>
			Promise.resolve(mockComplaint(true)),
		);
		jest.spyOn(api, 'post').mockImplementationOnce(() => Promise.resolve());
		render(<ComplaintDetails />);

		await waitFor(() => screen.getByText('Geno'));
		const confirmButton = screen.getByTestId('button');

		fireEvent.click(confirmButton);
		expect(screen.getByText('DENÚNCIA REPORTADA')).toBeInTheDocument();
	});

	test('test confirm complaint click', async () => {
		jest.spyOn(api, 'get').mockImplementationOnce(() =>
			Promise.resolve(mockComplaint(false)),
		);
		jest.spyOn(api, 'post').mockImplementationOnce(() => Promise.resolve());
		render(<ComplaintDetails />);

		await waitFor(() => screen.getByText('Geno'));
		const confirmButton = screen.getByTestId('button');

		fireEvent.click(confirmButton);
		expect(screen.getByText('PROBLEMA RESOLVIDO')).toBeInTheDocument();
  });

  test('test delete complaint click', async () => {
		jest.spyOn(api, 'get').mockImplementationOnce(() =>
			Promise.resolve({ data: complaintWithVoteMock('open') }),
		);

		jest.spyOn(api, 'delete').mockImplementationOnce(() =>
			Promise.resolve(),
		);

		act(() => {
			render(
				<MemoryRouter>
					<Router history={createMemoryHistory()}>
						<ComplaintDetails />
					</Router>
				</MemoryRouter>,
			);
		});

		await waitFor(() => screen.getByText('Sub-Ex'));

		userEvent.click(screen.getByText('Deletar Denúncia'));
		expect(mockHistoryPush).toHaveBeenCalled();
	});
});
