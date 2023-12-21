import { getCurrentUser } from '$actions/Auth';
import { dev } from '$app/environment';

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

	return await resolve(event);
};
