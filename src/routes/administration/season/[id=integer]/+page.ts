import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params, data }) => {
    const id = Number(params.id);
    const { seasons } = await parent();

    return {
        ...data,
        season: seasons.get(id) ?? null,
    };
};
