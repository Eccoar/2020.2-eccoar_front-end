import {
	createComplaint,
	createVote,
	getComplaintWithVote,
	listComplaints,
} from '../../services/complaint';
import api from '../../services/api';

const data = {
	complaints: [
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
			vote_id: 1,
			vote_userId: 1,
			vote_complaintId: 1,
			vote_typeVote: 'complaintUpvote',
		},
	],
};

describe('Complaint service', () => {
	test('should list complaints', async () => {
		jest.spyOn(api, 'get').mockImplementation(() =>
			Promise.resolve({ data }),
		);

		const response = await listComplaints();
		expect(response).toBe(data.complaints);
	});

	test('should get complaints with votes', async () => {
		jest.spyOn(api, 'get').mockImplementation(() =>
			Promise.resolve({ data }),
		);

		const response = await getComplaintWithVote(
			1,
			'DoOJ8n4s5YuQFnE24ZlcL6zIbgTK',
		);
		expect(response).toBe(data);
	});

	test('Should create vote', async () => {
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.resolve({ status: 200 }),
		);
		jest.spyOn(api, 'get').mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					variants: [{ key: '' }],
				},
			}),
		);
		const response = await createVote({
			userId: 'DoOJ8n4s5YuQFnE24ZlcL6zIbgTK',
			complaintId: 1,
			typeVote: 'complaintUpvote',
		});
		expect(response?.status).toEqual(200);
	});

	test('Should not create vote', async () => {
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.reject(Error),
		);
		jest.spyOn(api, 'get').mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					variants: [{ key: '' }],
				},
			}),
		);
		const response = await createVote({
			userId: 'DoOJ8n4s5YuQFnE24ZlcL6zIbgTK',
			complaintId: 1,
			typeVote: 'complaintUpvote',
		});
		expect(response).toEqual(null);
	});

	test('Should create complaint with buraco category', async () => {
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.resolve({ status: 200 }),
		);
		const response = await createComplaint({
			category: 'Buraco',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada.',
			latitude: 0,
			longitude: 0,
			name: 'mockName',
			userId: 'fWkjDryVHnP81VOqTrabFp99iAf3',
		});
		expect(response?.status).toEqual(200);
	});

	test('Should create complaint with agua category', async () => {
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.resolve({ status: 200 }),
		);
		const response = await createComplaint({
			category: 'Água',
			description: 'mockDescription',
			latitude: 0,
			longitude: 0,
			name: 'mockName',
			userId: 'DoOJ8n4s5YuQFnE24ZlcL6zIbgTK',
		});
		expect(response?.status).toEqual(200);
	});

	test('Should create complaint with agua energia', async () => {
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.resolve({ status: 200 }),
		);
		const response = await createComplaint({
			category: 'Energia',
			description: 'mockDescription',
			latitude: 0,
			longitude: 0,
			name: 'mockName',
			picture: new File([''], 'EchoImage'),
			userId: 'DoOJ8n4s5YuQFnE24ZlcL6zIbgTK',
		});
		expect(response?.status).toEqual(200);
	});

	test('Should fail to create complaint', async () => {
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.reject({ status: 400 }),
		);
		const response = await createComplaint({
			category: 'Buraco',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent malesuada.',
			latitude: 0,
			longitude: 0,
			name: 'mockName',
			userId: 'fWkjDryVHnP81VOqTrabFp99iAf3',
		});
		expect(response).toEqual(null);
	});
});
