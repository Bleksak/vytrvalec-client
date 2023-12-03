import axios from "axios";
import { baseUrl } from "$lib/API";
import type { TotalStatisticsDTO } from "$lib/DTO/StatisticsDTO";

export const fetchTotalStatistics = async (): Promise<TotalStatisticsDTO> => {
    const response = await axios.get(`${baseUrl}/stats`).catch(() => null);

    if (response === null) {
        return [];
    }

    return response.data;
}

