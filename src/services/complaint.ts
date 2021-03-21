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
