import { createComplaint } from '../../services/complaint';
import api from '../../services/api';

describe('Complaint service', () => {
	test('Should create complaint', async () => {
		jest.spyOn(api, 'post').mockImplementationOnce(() =>
			Promise.resolve({ status: 200 }),
		);
		const response = await createComplaint({
			category: 'Buraco',
			description: 'mockDescription',
			latitude: 0,
			longitude: 0,
			name: 'mockName',
		});
		expect(response?.status).toEqual(200);
	});
});
