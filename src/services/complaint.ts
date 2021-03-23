import api from './api';
import { AxiosResponse } from 'axios';

export const listComplaints = async () => {
	const response = await api.get('/complaints');
	return response.data.complaints;
};

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
			case 'Energia':
				category = 'Eletricity';
				break;
		}
		const { description, name } = data;
		return await api.post('/complaint/create', {
			description,
			name,
			latitude: 10,
			longitude: 10,
			userId: 1,
			category,
		});
	} catch (err) {
		console.error(err);
		return null;
	}
};
