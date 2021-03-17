import api from './api';

const listComplaints = async () => {
	const response = await api.get('/complaints');
	return response.data.complaints;
};

export { listComplaints };
