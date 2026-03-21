import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
    const id = Number(params.id);

    const { activities } = await parent();

    return {
        activity: activities.get(id)!,
    };
};
