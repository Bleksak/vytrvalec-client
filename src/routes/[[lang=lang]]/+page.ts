import { fetchSeasonResult } from '$actions/Season';
import { fetchTotalStatistics } from '$actions/Statistics';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
    const { api, seasons } = await parent();

    const totalStatistics = await fetchTotalStatistics(api);

    const lastSeason = seasons.values().next().value ?? null;

    if (lastSeason === null) {
        return {
            lastSeason: null,
            lastSeasonResult: null,
            totalStatistics,
        };
    }

    const lastSeasonResult = await fetchSeasonResult(api, lastSeason);

    return {
        lastSeason,
        lastSeasonResult,
        totalStatistics,
    };
};
