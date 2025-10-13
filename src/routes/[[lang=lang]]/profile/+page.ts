import { fetchUserStatistics } from '$actions/Statistics';
import { fetchUserSubmissions } from '$actions/Submission';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { api, activities } = await parent();

	const submissions = await fetchUserSubmissions(api);
	const statistics = await fetchUserStatistics(api);

	return {
		activities,
		submissions,
		statistics,
	};
};
