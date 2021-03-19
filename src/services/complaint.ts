import { AxiosResponse } from 'axios';
import api from './api';

export const createComplaint = async (data: {
	name: string;
	description: string;
	category: string;
}): Promise<AxiosResponse | null> => {
	try {
		let category;
		switch (data.category) {
			case 'Buraco':
				category = 'Hole';
				break;
			case 'Água':
				category = 'Water';
				break;
		}
		console.log({ ...data, latitude: 10, longitude: 10, userId: 1 });
		const { description, name } = data;
		const response = await api.post('/complaint', {
			description,
			name,
			latitude: 10,
			longitude: 10,
			userId: 1,
			status: true,
		});
		console.log(response);
		return response;
	} catch (err) {
		console.error(err);
		return null;
	}
};
