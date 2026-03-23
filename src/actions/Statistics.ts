import { type AxiosInstance } from 'axios';
import type { TotalStatisticsDTO, UserStatisticsDTO } from '$lib/DTO/StatisticsDTO';
import type { SeasonUsersStatisticsDTO } from '$lib/DTO/SeasonUsersDTO';

export const fetchTotalStatistics = async (api: AxiosInstance): Promise<TotalStatisticsDTO> => {
    const response = await api.get(`/stats/total`);
    
    return response.data;
};

export const fetchUserStatistics = async (
    api: AxiosInstance,
): Promise<Array<UserStatisticsDTO>> => {
    return (await api.get(`/stats`).catch(() => null))?.data ?? [];
};

export const fetchSeasonUsersStatistics = async (
    api: AxiosInstance,
    seasonId: number,
): Promise<SeasonUsersStatisticsDTO> => {
    return  (await api.get(`/statistics/faculties/${seasonId}`).catch(() => null))?.data ?? [];;
};
