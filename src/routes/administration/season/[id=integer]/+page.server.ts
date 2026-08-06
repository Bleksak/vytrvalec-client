import type { PageServerLoad } from './$types';
import { fetchSubmissionsForSeason } from '$actions/Submission';
import type { SubmissionState } from '$lib/enums/SubmissionState';
import type { SelectedFilter } from '$lib/DTO/SelectedFilter';

export const load: PageServerLoad = async ({ params, url, locals }) => {
    const id = Number(params.id);

    const user = url.searchParams.get('user');
    const date = url.searchParams.get('date');
    const state = url.searchParams.get('state');
    const activity = url.searchParams.get('activity');
    const week = url.searchParams.get('week');
    const faculty = url.searchParams.get('faculty');
    const page = url.searchParams.get('page');

    const filter: SelectedFilter = {
        user: user && user !== '' ? user : undefined,
        date: date && date !== '' ? date : undefined,
        state: state && state !== '' ? (state as SubmissionState) : undefined,
        activity: activity && activity !== '' ? activity : undefined,
        week: week && week !== '' ? week : undefined,
        faculty: faculty && faculty !== '' ? faculty : undefined,
        page: page && page !== '' && !isNaN(Number(page)) ? Number(page) : undefined,
    };

    const submissions = await fetchSubmissionsForSeason(locals.axios, { id }, filter);

    return {
        filter,
        submissions,
    };
};
