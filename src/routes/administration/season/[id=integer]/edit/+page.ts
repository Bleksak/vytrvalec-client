import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
	const id = Number(params.id);

	const { seasons, faculties } = await parent();

	return {
		season: seasons.get(id) ?? null,
		faculties
	};
};
