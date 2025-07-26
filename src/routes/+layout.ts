import axios from 'axios';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	axios.defaults.baseURL = import.meta.env.VITE_API_BASE;
	if (data.jwt !== null) {
		axios.defaults.headers.common.Authorization = `Bearer ${data.jwt}`;
	}

	return {
		ws: import.meta.env.VITE_WS_BASE,
		user: data.user,
		currentSeason: data.currentSeason,
		lang: data.lang,
		jwt: data.jwt
	};
};
