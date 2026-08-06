import { fetchActivities } from '$actions/Activity';
import { createRecordFromEntityArray } from '$lib/Helper';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
    const { api } = await parent();
    const activities = createRecordFromEntityArray(await fetchActivities(api));

    return {
        activities,
    };
};
