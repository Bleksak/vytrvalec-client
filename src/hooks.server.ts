import { getCurrentUser } from '$actions/Auth';
import { dev } from '$app/environment';
import { locales } from '$translations/i18n-util';
import { error, redirect, type Handle } from '@sveltejs/kit';
import axios from 'axios';

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

	axios.defaults.baseURL = import.meta.env.VITE_API_BASE;
	axios.defaults.headers.common.Authorization = `Bearer ${event.locals.jwt}`;

	const result = await getCurrentUser();

	if (result.type === 'success') {
		event.locals.user = result.data;
	}

	if (isPathname(event.url.pathname, '/submission')) {
		if (!event.locals.user) {
			redirect(303, '/');
		}
	}

	if (isPathname(event.url.pathname, '/administration')) {
		if (!event.locals.user || !event.locals.user.roles.includes('ROLE_STAFF')) {
			error(404);
		}
	}

	return await resolve(event);
};
