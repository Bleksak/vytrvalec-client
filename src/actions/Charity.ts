import type {
	CharityCreateDTO,
	CharityCreateResponse,
	CharityDTO,
	CharityUpdateDTO,
	CharityUpdateResponse
} from '$lib/DTO/CharityDTO';
import axios, { type AxiosInstance } from 'axios';

export const fetchCharities = async (api: AxiosInstance = axios): Promise<Array<CharityDTO>> => {
	let response = await api.get('/charity').catch(() => null);

	if (response === null) {
		return [];
	}

	return response.data;
};

export async function fetchCharity(
	api: AxiosInstance,
	charity: number
): Promise<CharityDTO | null> {
	return (await api.get(`/charity/${charity}`).catch(() => null))?.data;
}

export async function createCharity(
	api: AxiosInstance = axios,
	charity: CharityCreateDTO
): Promise<CharityCreateResponse> {
	const response = await api.post('/charity', charity).catch((error) => {
		if (error.response) {
			return error.response;
		}

		return null;
	});

	if (response === null) {
		return {
			type: 'error',
			errors: { auth: ['server_down'] }
		};
	}

	if (response.status !== 201) {
		return {
			type: 'error',
			errors: response.data
		};
	}

	return {
		type: 'success',
		data: response.data
	};
}

export const updateCharity = async (
	api: AxiosInstance,
	id: number,
	data: CharityUpdateDTO
): Promise<CharityUpdateResponse> => {
	const response = await api.patch(`/charity/${id}`, data).catch((error) => {
		if (error.response) {
			return error.response;
		}

		return null;
	});

	if (response === null) {
		return {
			type: 'error',
			errors: { auth: ['server_down'] }
		};
	}

	if (response.status !== 200) {
		return {
			type: 'error',
			errors: response.data
		};
	}

	return {
		type: 'success',
		data: data
	};
};

export const removeCharity = async (charity: CharityDTO): Promise<boolean> => {
	const response = await axios.delete(`/charity/${charity.id}`).catch(() => null);

	return response !== null;
};
