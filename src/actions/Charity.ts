import type {
	CharityCreateDTO,
	CharityCreateResponse,
	CharityDTO,
	CharityUpdateDTO,
	CharityUpdateResponse
} from '$lib/DTO/CharityDTO';
import axios from 'axios';

export const fetchCharities = async (): Promise<Array<CharityDTO>> => {
	let response = await axios.get('/charity').catch(() => null);

	if (response === null) {
		return [];
	}

	return response.data;
};

export const fetchCharity = async (charity: number): Promise<CharityDTO | null> => {
	return (await axios.get(`/charity/${charity}`).catch(() => null))?.data;
};

export const createCharity = async (charity: CharityCreateDTO): Promise<CharityCreateResponse> => {
	const response = await axios.post('/charity', charity).catch((error) => {
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
};

export const updateCharity = async (
	id: number,
	data: CharityUpdateDTO
): Promise<CharityUpdateResponse> => {
	const response = await axios.patch(`/charity/${id}`, data).catch((error) => {
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
