export const load = ({ locals, params }: any) => {
	return {
		user: locals.user,
		lang: params.lang ?? 'cs'
	};
};
