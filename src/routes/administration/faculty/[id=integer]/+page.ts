import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const id = Number(params.id);

	const { faculties } = await parent();

	return {
		faculty: faculties.get(id)!
	};
};
