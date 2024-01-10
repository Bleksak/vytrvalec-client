import axios from 'axios';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	axios.defaults.baseURL = import.meta.env.VITE_API_BASE;
	axios.defaults.headers.common.Authorization = `Bearer ${data.jwt}`;

	return {
		user: data.user,
		lang: data.lang
	};
};
