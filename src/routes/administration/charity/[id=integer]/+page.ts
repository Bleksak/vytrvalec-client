import { fetchCharity } from '$actions/Charity';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params, url }) => {
    const id = Number(params.id);

    const { api } = await parent();

    const charity = await fetchCharity(api, id);

    const seasonFrom = url.searchParams.get('season');
    const seasonId = seasonFrom ? Number(seasonFrom) : null;

    return {
        charity,
        seasonId,
    };
};
