export type OnboardingDTO = {
    status: OnboardingStatus;
    season: number | undefined;
};

export type OnboardingStatus = "completed";