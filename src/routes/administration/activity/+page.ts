import { fetchActivities } from '$actions/Activity';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { api } = await parent();
	const activities = await fetchActivities(api);

	return {
		activities
	};
};
