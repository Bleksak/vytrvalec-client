import { getCurrentUser } from '$actions/Auth';
import { dev } from '$app/environment';
import { locales } from '$translations/i18n-util';
import { redirect } from '@sveltejs/kit';

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

export const handle = async ({ event, resolve }: any): Promise<any> => {
	// NOTE: When developing with https (server), axios will reject all requests unless we set this environment variable
	if (dev) {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	}

	// TODO: ???
	const result = await getCurrentUser();
	if (result.type === 'success') {
		event.locals.user = result.response;
	}

	if (isPathname(event.url.pathname, '/submission')) {
		if (!event.locals.user) {
			redirect(303, '/');
		}
	}

	return await resolve(event);
};
