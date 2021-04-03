import axios, { AxiosResponse } from 'axios';

const flagr = axios.create({ baseURL: `http://localhost:18000/api/v1` });

export const getFlag = async (flagID: string): Promise<AxiosResponse> => {
	const response = await flagr.get(`/flags/${flagID}`);
	return response;
};
