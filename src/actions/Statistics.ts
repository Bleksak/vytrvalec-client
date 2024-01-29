import axios from 'axios';
import type { TotalStatisticsDTO } from '$lib/DTO/StatisticsDTO';

export const fetchTotalStatistics = async (): Promise<TotalStatisticsDTO> => {
    const response = await axios.get(`/stats/total`);

    return response.data;
};
