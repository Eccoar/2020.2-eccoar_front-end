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
	complaintId: number,
	userId: string,
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
	latitude?: number;
	longitude?: number;
	picture?: File;
	userId: string;
}): Promise<AxiosResponse | null> => {
	try {
		let picture;
		if (data.picture) {
			picture = await toBase64(data.picture);
		}
		const {
			description,
			name,
			category,
			userId,
			latitude,
			longitude,
		} = data;
		return await api.post('/complaints/', {
			description,
			name,
			latitude,
			longitude,
			userId,
			category: Category[category as keyof typeof Category],
			picture,
		});
	} catch (err) {
		console.error(err);
		return null;
	}
};

export const createVote = async (data: {
	complaintId: number;
	typeVote: string;
	userId: string;
}): Promise<AxiosResponse | null> => {
	try {
		const flag = await getFlag('3');
		const voteFlag = flag.data.variants[0]?.key;
		const { complaintId, typeVote, userId } = data;
		return await api.post('/votes', {
			userId,
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

export const removeVote = async (data: {
	userId: string;
	id: number;
	typeVote: string;
}): Promise<AxiosResponse | null> => {
	try {
		const { userId, id, typeVote } = data;
		return await api.delete(
			`/vote?complaintId=${id}&userId=${userId}&typeVote=${typeVote}`,
		);
	} catch (err) {
		console.error(err.message);
		return null;
	}
};

export const deleteComplaint = async (data: {
	userId: string;
	id: number;
}): Promise<AxiosResponse | null> => {
	try {
		const { userId, id } = data;
		const response = await api.delete(
			`/complaints?id=${id}&userId=${userId}`,
		);
		return response;
	} catch (err) {
		console.error(err.message);
		return null;
	}
};

export const getVotes = async (
	userId: string,
	latitude?: number,
	longitude?: number,
) => {
	const params = {
		userId,
		latitude,
		longitude,
	};
	const userVote = await api.get('/votes', { params });
	return userVote.data;
};
