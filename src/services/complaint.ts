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
	const response = await api.get('/complaints/votes', {
		params: {
			userId,
			complaintId,
		},
	});
	return response.data;
};

enum Category {
	'Buraco' = 'Hole',
	'Água' = 'Water',
	'Energia' = 'Electricity',
}

export const createComplaint = async (data: {
	name: string;
	description: string;
	category: string;
	latitude: number;
	longitude: number;
}): Promise<AxiosResponse | null> => {
	try {
		const { description, name, latitude, longitude, category } = data;
		return await api.post('/complaint/create', {
			description,
			name,
			latitude,
			longitude,
			userId: 1,
			category: Category[category as keyof typeof Category],
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
		return await api.post('/votes', {
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
	const userVote = await api.get('/votes', { params });

	return userVote.data;
};
