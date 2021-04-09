import axios, { AxiosResponse } from 'axios';

const flagr = axios.create({ baseURL: `https://flagr.eccoar.online/api/v1` });

export const getFlag = async (flagID: string): Promise<AxiosResponse> => {
	const response = await flagr.get(`/flags/${flagID}`);
	return response;
};
