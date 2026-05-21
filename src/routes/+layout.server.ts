import { ONBOARDING_COOKIE_NAME, type OnboardingDTO } from '$lib/DTO/OnboardingDTO';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, cookies, params }) => {
    const onboardingCookie = cookies.get(ONBOARDING_COOKIE_NAME);

    return {
        user: locals.user,
        currentSeason: locals.currentSeason,
        onboarding: onboardingCookie ? (JSON.parse(onboardingCookie) as OnboardingDTO) : null,
        lang: params.lang ?? 'cs',
        jwt: locals.jwt,
    };
};
