import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ComplaintDetails from '../../pages/ComplaintDetails';
import api from '../../services/api';
import * as complaintService from '../../services/complaint';

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
});
