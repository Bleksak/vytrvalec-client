import type { OnboardingDTO } from '$lib/DTO/OnboardingDTO';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, cookies, params }) => {
    const onboardingCookie = cookies.get('onboardingDone');

    return {
        user: locals.user,
        currentSeason: locals.currentSeason,
        onboardingDone: onboardingCookie ? JSON.parse(onboardingCookie) as OnboardingDTO : null,
        lang: params.lang ?? 'cs',
        jwt: locals.jwt,
    };
};
