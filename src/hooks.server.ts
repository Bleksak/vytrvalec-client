import { getCurrentUser } from '$actions/Auth';
import { fetchCurrentSeason } from '$actions/Season';
import { dev } from '$app/environment';
import { UserRole } from '$lib/DTO/UserRole';
import { locales } from '$translations/i18n-util';
import { error, redirect, type Handle } from '@sveltejs/kit';
import axios from 'axios';
import '$lib/DTO/CommonArkType';

const isPathname = (current: string, wanted: string): boolean => {
	if (current == wanted) {
		return true;
	}

	const loc = locales.join('|');

	if (current.match(`^(\/(${loc}))?${wanted}`)) {
		return true;
	}

	return false;
};

export const handle: Handle = async ({ event, resolve }): Promise<any> => {
	// NOTE: When developing with https (server), axios will reject all requests unless we set this environment variable

	if (dev) {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	}

	event.locals.jwt = event.cookies.get('jwt') ?? null;

	axios.defaults.baseURL = import.meta.env.VITE_SERVER_API_BASE || import.meta.env.VITE_API_BASE;

	if (event.locals.jwt !== null) {
		axios.defaults.headers.common.Authorization = `Bearer ${event.locals.jwt}`;
	}

	const result = await getCurrentUser();

	if (result.type === 'success') {
		event.locals.user = result.data;
		const currentSeason = await fetchCurrentSeason();
		if (currentSeason) {
			event.locals.currentSeason = currentSeason;
		}
	}

	if (isPathname(event.url.pathname, '/submission')) {
		if (!event.locals.user) {
			redirect(307, '/');
		}
	}

	if (isPathname(event.url.pathname, '/administration')) {
		if (!event.locals.user || !event.locals.user.roles.includes(UserRole.Staff)) {
			error(404);
		}
	}

	return await resolve(event);
};
