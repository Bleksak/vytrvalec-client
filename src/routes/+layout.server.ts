import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, cookies, params }) => {
    return {
        user: locals.user,
        currentSeason: locals.currentSeason,
        onboardingConfirmed: cookies.get('onboarding_confirmed'),
        lang: params.lang ?? 'cs',
        jwt: locals.jwt,
    };
};
