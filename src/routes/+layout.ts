import axios from 'axios';
import type { LayoutLoad } from './$types';
import { createRecordFromEntityArray } from '$lib/Helper';
import { fetchActivities } from '$actions/Activity';
import { fetchFaculties } from '$actions/Faculty';
import { fetchSeasons } from '$actions/Season';

export const load: LayoutLoad = async ({ data }) => {
	const api = axios.create({
		baseURL: import.meta.env.VITE_API_BASE
	});

	axios.defaults.baseURL = import.meta.env.VITE_API_BASE;
	if (data.jwt !== null) {
		api.defaults.headers.common.Authorization = `Bearer ${data.jwt}`;
		axios.defaults.headers.common.Authorization = `Bearer ${data.jwt}`;
	}

	const activities = createRecordFromEntityArray(await fetchActivities(api));
	const faculties = createRecordFromEntityArray(await fetchFaculties(api));
	const seasons = createRecordFromEntityArray(await fetchSeasons(api));

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
