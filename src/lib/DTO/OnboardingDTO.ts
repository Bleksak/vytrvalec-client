export const ONBOARDING_COOKIE_NAME = "onboarding";

export type OnboardingDTO = {
    status: OnboardingStatus;
    season: number | undefined;
};

export type OnboardingStatus = "completed";