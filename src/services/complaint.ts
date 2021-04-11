import api from './api';
import { AxiosResponse } from 'axios';

const toBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

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
	picture: File;
}): Promise<AxiosResponse | null> => {
	try {
		let category;
		let picture;
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
		if (data.picture) {
			picture = await toBase64(data.picture);
			console.log(picture);
		}
		const { description, name } = data;
		return await api.post('/complaints', {
			description,
			name,
			latitude,
			longitude,
			userId: 1,
			category,
			picture,
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
