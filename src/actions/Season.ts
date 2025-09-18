import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import {
	SeasonType,
	type CreateSeasonDTO,
	type CreateSeasonResponse,
	type SeasonConfigDTO,
	type SeasonDTO
} from '$lib/DTO/SeasonDTO';
import { type SeasonResultDTO } from '$lib/DTO/SeasonResultDTO';
import { ArkErrors } from 'arktype';

export const fetchSeasons = async (api: AxiosInstance = axios): Promise<Array<SeasonDTO>> => {
	let response = await api.get('/season').catch(() => null);

	if (response === null) {
		return [];
	}

	let data = [];

	for (const seasonRaw of response.data) {
		const season = SeasonType(seasonRaw);

		if (season instanceof ArkErrors) {
			console.log(season.summary);
			continue;
		}

		data.push(season);
	}

	return data;
};

export const fetchSeason = async (): Promise<SeasonDTO | null> => {
	return (await axios.get('/season').catch(() => null))?.data;
};

export const createSeason = async (
	api: AxiosInstance,
	data: SeasonConfigDTO
): Promise<CreateSeasonResponse> => {
	const response = await api.post('/season', data).catch((err) => {
		if (err.response) {
			return err.response;
		}

		return null;
	});

	if (response === null) {
		return {
			type: 'error',
			errors: {
				auth: ['server_down']
			}
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

export const updateSeason = async (season: SeasonDTO): Promise<AxiosResponse<any>> => {
	return await axios.patch(`/season/${season.id}`, season);
};

export const fetchSeasonResult = async (
	api: AxiosInstance = axios,
	season: SeasonDTO
): Promise<SeasonResultDTO> => {
	return (await api.get(`/season/${season.id}/results`).catch(() => null))?.data ?? [];
};

export const createSeasonCache = async (season: SeasonDTO): Promise<boolean> => {
	const response = await axios.post(`/cache/season/${season.id}`).catch(() => null);

	if (response === null) {
		return false;
	}

	return response.status === 201;
};

export const getIsSeasonCached = async (season: SeasonDTO): Promise<boolean> => {
	const response = await axios.get(`/cache/season/${season.id}`).catch(() => null);

	if (response === null) {
		return false;
	}

	return response.data;
};

export const deleteSeason = async (season: SeasonDTO): Promise<boolean> => {
	const response = await axios.delete(`/season/${season.id}`).catch(() => {
		return null;
	});

	return response !== null;
};

export const fetchCurrentSeason = async (): Promise<SeasonDTO | null> => {
	const response = await axios.get<SeasonDTO>('season/current').catch(() => {
		return null;
	});

	return response ? response.data : response;
};
