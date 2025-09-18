import type {
	ActivityCreateResponse,
	ActivityDTO,
	ActivityUpdateResponse,
	ActivityCreateDTO,
	ActivityUpdateDTO
} from '$lib/DTO/ActivityDTO';
import axios, { type AxiosInstance } from 'axios';

export async function fetchActivities(api: AxiosInstance = axios): Promise<Array<ActivityDTO>> {
	return (await api.get('/activity').catch(() => null))?.data ?? [];
}

export async function createActivity(
	api: AxiosInstance = axios,
	data: ActivityCreateDTO
): Promise<ActivityCreateResponse> {
	const response = await api.post('/activity', data).catch((error) => {
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
			errors: response?.data ?? {}
		};
	}

	return {
		type: 'success',
		response: response.data
	};
}

export async function updateActivity(
	api: AxiosInstance = axios,
	id: number,
	data: ActivityUpdateDTO
): Promise<ActivityUpdateResponse> {
	const response = await api.patch(`/activity/${id}`, data).catch((error) => {
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
			errors: response?.data ?? {}
		};
	}

	return {
		type: 'success',
		response: response.data
	};
}
