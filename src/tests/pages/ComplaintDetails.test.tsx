import {
	fireEvent,
	act,
	render,
	screen,
	waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComplaintDetails from '../../pages/ComplaintDetails';
import api from '../../services/api';

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

const complaintWithVoteMock = (status: string, hasVote = true) => ({
	complaint_id: 1,
	complaint_name: 'Sub-Ex',
	complaint_description:
		'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
	complaint_latitude: 36.275231,
	complaint_longitude: 113.310158,
	complaint_userId: 74,
	complaint_category: 'Water',
	complaint_creationDate: '2021-02-21T18:52:45.000Z',
	complaint_closeDate: '2020-11-11T05:41:31.000Z',
	complaint_picture: 'https://dummyimage.com/237x100.png/cc0000/ffffff',
	complaint_status: status,
	vote_id: hasVote ? 405 : null,
	vote_userId: hasVote ? 1 : null,
	vote_complaintId: hasVote ? 7 : null,
	vote_typeVote: hasVote ? 'complaintUpvote' : null,
});

describe('Test ComplaintDetails With waiting complaint with vote', () => {
	beforeEach(async () => {
		jest.spyOn(api, 'get').mockImplementation(() =>
			Promise.resolve({ data: complaintWithVoteMock('wait') }),
		);
		jest.spyOn(api, 'post').mockImplementation(() => Promise.resolve());

		jest.spyOn(api, 'delete').mockImplementation(() => Promise.resolve());

		render(<ComplaintDetails />);
		await waitFor(() => screen.getByText('Sub-Ex'));
	});

	test('test confirm complaint click', async () => {
		fireEvent.click(screen.getByTestId('button'));
		expect(screen.getByText('CONFIRMAR RESOLUÇÃO')).toBeInTheDocument();
	});

	test('test confirm complaint button click', async () => {
		userEvent.click(screen.getByTestId('button'));
		expect(screen.getByTestId('button')).toHaveClass(
			'complain-button--border-secondary',
		);
		userEvent.click(screen.getByTestId('button'));
		expect(screen.getByTestId('button')).not.toHaveClass(
			'complain-button--border-secondary',
		);
	});
});

describe('Test ComplaintDetails With open complaint with votes', () => {
	beforeEach(async () => {
		jest.spyOn(api, 'get').mockImplementation(() =>
			Promise.resolve({ data: complaintWithVoteMock('open') }),
		);

		jest.spyOn(api, 'post').mockImplementation(() => Promise.resolve());

		render(<ComplaintDetails />);
		await waitFor(() => screen.getByText('Sub-Ex'));
	});

	test('test upvote button click', async () => {
		userEvent.click(screen.getByTestId('button'));
		expect(screen.getByTestId('button')).toHaveClass(
			'complain-button--border-primary',
		);
		userEvent.click(screen.getByTestId('button'));
		expect(screen.getByTestId('button')).not.toHaveClass(
			'complain-button--border-primary',
		);
	});
});

describe('Test ComplaintDetails With open complaint with no vote', () => {
	beforeEach(async () => {
		jest.spyOn(api, 'get').mockImplementation(() =>
			Promise.resolve({ data: complaintWithVoteMock('open', false) }),
		);
		jest.spyOn(api, 'post').mockImplementation(() => Promise.resolve());

		jest.spyOn(api, 'delete').mockImplementation(() => Promise.resolve());
		render(<ComplaintDetails />);
		await waitFor(() => screen.getByText('Sub-Ex'));
	});

	test('test screen rendering', () => {
		expect(screen.getByTestId('ComplainDetails')).toBeInTheDocument();
	});

	test('test confirm upVote click', async () => {
		const confirmButton = screen.getByTestId('button');

		fireEvent.click(confirmButton);
		expect(screen.getByText('DENÚNCIA REPORTADA')).toBeInTheDocument();
	});
});
