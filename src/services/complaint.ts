import api from './api';
import { AxiosResponse } from 'axios';

export const listComplaints = async () => {
	const response = await api.get('/complaints');
	return response.data.complaints;
};

export const getComplaintWithVote = async (
	userId: number,
	complaintId: number,
) => {
	const response = await api.get('/complaint/withVote', {
		params: {
			userId,
			complaintId,
		},
	});
	return response.data;
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

export const createVote = async (data: {
	userId: number;
	complaintId: number;
	typeVote: string;
}): Promise<AxiosResponse | null> => {
	try {
		const { complaintId, typeVote } = data;
		return await api.post('/vote/add', {
			userId: 1,
			complaintId,
			typeVote,
		});
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const getVotes = async (userId: number) => {
	const params = {
		userId: userId,
	};
	const userVote = await api.get('/vote/list', { params });

	return userVote.data;
};
