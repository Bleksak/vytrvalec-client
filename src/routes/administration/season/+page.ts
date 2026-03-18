import { fetchSeasons } from '$actions/Season';
import { createRecordFromEntityArray } from '$lib/Helper';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { api } = await parent();

	const seasons = createRecordFromEntityArray(await fetchSeasons(api));

	return {
		seasons
	};
};
