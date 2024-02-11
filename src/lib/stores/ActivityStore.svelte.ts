import { fetchActivities } from '$actions/Activity';
import type { ActivityDTO } from '$lib/DTO/ActivityDTO';

export type ActivityStore = {
    get: (id: number) => ActivityDTO | null;
    all: () => ActivityDTO[]
    promise: () => Promise<ActivityDTO[]>;
};

export const createActivityStore = (): ActivityStore => {
    let activities = $state<ActivityDTO[]>([]);

    let activitiesPromise: Promise<ActivityDTO[]> = fetchActivities().catch(e => {
        return [];
    });

    activitiesPromise.then((result) => {
        activities = result;
    });

    const get = (id: number): ActivityDTO | null => {
        if (Number.isNaN(id)) {
            return null;
        }

        return activities.find((activity: ActivityDTO) => activity.id === id) ?? null;
    };

    const all = (): ActivityDTO[] => {
        return activities;
    };


    return {
        get: get,
        all: all,
        promise: () => activitiesPromise,
    };
};


const activityStore = createActivityStore();

export default activityStore;
