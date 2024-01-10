import axios, { type AxiosResponse } from 'axios';
import type { TotalStatisticsDTO } from '$lib/DTO/StatisticsDTO';

export const fetchTotalStatistics = async (): Promise<AxiosResponse<TotalStatisticsDTO>> => {
	return await axios.get(`/stats`);
};
