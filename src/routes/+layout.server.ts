import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, params }) => {
    return {
        user: locals.user,
        currentSeason: locals.currentSeason,
        lang: params.lang ?? 'cs',
        jwt: locals.jwt,
    };
};
