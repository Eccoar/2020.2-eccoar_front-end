import api from './api';
import { AxiosResponse } from 'axios';
import { getFlag } from '../services/flagr';

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

export const createComplaint = async (data: {
	name: string;
	description: string;
	category: string;
	latitude?: number;
	longitude?: number;
	picture?: File;
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
		}
		const { description, name } = data;
		return await api.post('/complaints/', {
			description,
			name,
			latitude: 10,
			longitude: 10,
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
		const flag = await getFlag('3');
		const voteFlag = flag.data.variants[0]?.key;
		const { complaintId, typeVote } = data;
		return await api.post('/votes', {
			userId: 1,
			complaintId,
			typeVote,
			voteFlag,
		});
	} catch (err) {
		console.error(err);
		alert('Houve um erro e a denúncia não foi confirmada!');
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
