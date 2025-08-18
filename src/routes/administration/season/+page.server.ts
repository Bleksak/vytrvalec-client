import { fetchSeasons } from '$actions/Season';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
	const seasons = await fetchSeasons();

	return {
		seasons
	};
};
