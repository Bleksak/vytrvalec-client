import { fetchSeasons } from '$actions/Season';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { api } = await parent();
	const seasons = await fetchSeasons(api);

	return {
		seasons
	};
};
