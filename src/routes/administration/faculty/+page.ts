import { fetchFaculties } from '$actions/Faculty';
import { createRecordFromEntityArray } from '$lib/Helper';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { api } = await parent();

	const faculties = createRecordFromEntityArray(await fetchFaculties(api));

	return {
		faculties
	};
};
