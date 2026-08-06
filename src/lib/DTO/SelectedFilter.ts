import type { SubmissionState } from '$lib/enums/SubmissionState';

export type SelectedFilter = {
    user?: string;
    faculty?: string;
    date?: string;
    state?: SubmissionState;
    week?: string;
    activity?: string;
    page?: number;
};
