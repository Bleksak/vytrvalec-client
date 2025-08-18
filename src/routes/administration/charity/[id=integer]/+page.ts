import { fetchCharity } from '$actions/Charity';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
	const id = Number(params.id);

	const { api } = await parent();

	const charity = await fetchCharity(api, id);

	return {
		charity
	};
};
