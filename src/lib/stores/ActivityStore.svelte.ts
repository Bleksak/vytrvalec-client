import { fetchActivities } from '$actions/Activity';
import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
import type { AxiosInstance } from 'axios';

export type ActivityStore = {
    all: () => ActivityDTO[];
    get: (id: number) => ActivityDTO | null;
    promise: () => Promise<ActivityDTO[]>;
};
const createActivityStore = (api: AxiosInstance): ActivityStore => {
    let activities = $state<ActivityDTO[]>([]);
    const activitiesPromise = fetchActivities(api);

    activitiesPromise.then((result: ActivityDTO[]) => {
        activities = result;
    });

    const all = (): ActivityDTO[] => {
        return activities;
    };

    const get = (id: number): ActivityDTO | null => {
        if (Number.isNaN(id)) {
            return null;
        }

        return activities.find((activity: ActivityDTO) => activity.id === id) ?? null;
    };

    const promise = (): Promise<ActivityDTO[]> => {
        return activitiesPromise;
    };

    return {
        all: all,
        get: get,
        promise: promise,
    };
};

export default createActivityStore;
