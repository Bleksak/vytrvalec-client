import { fetchCharities } from '$actions/Charity';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { api } = await parent();

	const charities = await fetchCharities(api);

	return {
		charities
	};
};
