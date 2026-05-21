import type { PageServerLoad } from './$types';
import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const activitiesResponse = await locals.axios.get<Array<ActivityDTO>>('/activity');

    if (activitiesResponse.status !== 200) {
        error(400, {
            message: 'activities',
        });
    }

    const activitiesMap = new Map<number, ActivityDTO>();
    for (const activity of activitiesResponse.data) {
        activitiesMap.set(activity.id, activity);
    }

    return {
        activities: activitiesMap,
    };
};
