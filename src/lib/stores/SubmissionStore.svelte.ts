import { fetchSubmissionsForSeason } from '$actions/Submission';
import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
import type { SubmissionResponseAdminDTO } from '$lib/DTO/SubmissionDTO';
import axios from 'axios';

export type SubmissionFilter = {
    reviewed?: number;
    accepted?: number;
    activity?: number;
    faculty?: number;
    user?: string;
    week?: number;
    date?: Date;
};

export type SubmissionStore = {
    get: (id: number) => SubmissionResponseAdminDTO | null;
    all: () => Array<SubmissionResponseAdminDTO>;
    loadNextPage: () => void;
    update: (submission: SubmissionResponseAdminDTO) => void;
    promise: () => Promise<Array<SubmissionResponseAdminDTO>>;
    season: number;
};

export const createSubmissionStore = (season: SeasonDTO): SubmissionStore => {
    let submissions = $state<Array<SubmissionResponseAdminDTO>>([]);
    const filters = $state<object>({});

    let currentPage = 1;
    const submissionsPromise: Promise<Array<SubmissionResponseAdminDTO>> = fetchSubmissionsForSeason(
        axios,
        season,
        { page: currentPage, ...filters },
    );

    let canLoadMore = true;

    submissionsPromise.then((result) => {
        submissions = result;
    });

    const get = (id: number): SubmissionResponseAdminDTO | null => {
        if (Number.isNaN(id)) {
            return null;
        }

        return submissions.find((submission) => submission.id === id) ?? null;
    };

    const all = (): Array<SubmissionResponseAdminDTO> => {
        return submissions;
    };

    const loadNextPage = () => {
        if (!canLoadMore) return;

        currentPage++;
        fetchSubmissionsForSeason(axios, season, { page: currentPage, ...filters }).then(
            (nextSubmissions) => {
                submissions = [...submissions, ...nextSubmissions];
                if (nextSubmissions.length === 0) {
                    canLoadMore = false;
                }
            },
        );
    };

    const update = (submission: SubmissionResponseAdminDTO) => {
        const index = submissions.findIndex((s) => s.id === submission.id);

        if (index !== -1) {
            submissions[index] = submission;
        }
    };

    return {
        get: get,
        all: all,
        loadNextPage: loadNextPage,
        update: update,
        promise: () => submissionsPromise,
        season: season.id,
    };
};

export default createSubmissionStore;
