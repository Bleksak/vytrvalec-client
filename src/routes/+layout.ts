import axios from 'axios';
import { browser } from '$app/environment';
import { createRecordFromEntityArray } from '$lib/Helper';
import { fetchActivities } from '$actions/Activity';
import { fetchFaculties } from '$actions/Faculty';
import { fetchSeasons } from '$actions/Season';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE
    });

    if (data.jwt !== null && data.jwt !== undefined) {
        api.defaults.headers.common.Authorization = `Bearer ${data.jwt}`;
        if (browser) {
            axios.defaults.headers.common.Authorization = `Bearer ${data.jwt}`;
        }
    }

    const activityPromise = fetchActivities(api);
    const facultyPromise = fetchFaculties(api);
    const seasonsPromise = fetchSeasons(api);

    const [activitiesRaw, facultiesRaw, seasonsRaw] = await Promise.all([
        activityPromise,
        facultyPromise,
        seasonsPromise
    ]);

    const activities = createRecordFromEntityArray(activitiesRaw);
    const faculties = createRecordFromEntityArray(facultiesRaw);
    const seasons = createRecordFromEntityArray(seasonsRaw);

    return {
        api,
        activities,
        faculties,
        seasons,
        ws: import.meta.env.VITE_WS_BASE,
        user: data.user,
        currentSeason: data.currentSeason,
        lang: data.lang,
        jwt: data.jwt
    };
};

