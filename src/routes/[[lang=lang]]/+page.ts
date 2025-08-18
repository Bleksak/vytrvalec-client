import { fetchSeasonResult } from '$actions/Season';
import { fetchTotalStatistics } from '$actions/Statistics';
import type { PageLoad } from './$types';
import { SeasonResult } from '$lib/DTO/SeasonResultDTO';

export const load: PageLoad = async ({ parent }) => {
	const { api, seasons, activities } = await parent();

	const totalStatistics = await fetchTotalStatistics(api);

	const lastSeason = seasons.at(0) ?? null;
	const lastSeasonResult = lastSeason
		? new SeasonResult(await fetchSeasonResult(api, lastSeason), activities)
		: null;

	return {
		lastSeason,
		lastSeasonResult,
		totalStatistics
	};
};
