import axios, { type AxiosResponse } from 'axios';
import type { CreateSeasonDTO, CreateSeasonResponse, SeasonDTO } from '$lib/DTO/SeasonDTO';
import { SeasonResult, type SeasonResultDTO } from '$lib/DTO/SeasonResultDTO';

export const fetchSeasons = async (): Promise<Array<SeasonDTO>> => {
	let response = await axios.get('/season').catch(() => null);

	if (response === null) {
		return [];
	}

	return (response.data as Array<SeasonDTO>).map((season) => {
		season.start = new Date(season.start);
		season.end = new Date(season.end);
		return season;
	});
};

export const fetchSeason = async (): Promise<SeasonDTO | null> => {
	return (await axios.get('/season').catch(() => null))?.data;
};

export const createSeason = async (season: CreateSeasonDTO): Promise<CreateSeasonResponse> => {
	const data = {
		start: season.start.toISOString(),
		end: season.end.toISOString(),
		charity: season.charity
	};

	const response = await axios.post('/season', data).catch((err) => {
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

export const fetchSeasonResult = async (season: SeasonDTO): Promise<SeasonResultDTO> => {
	return (await axios.get(`/season/${season.id}/results`).catch(() => null))?.data ?? [];
};
