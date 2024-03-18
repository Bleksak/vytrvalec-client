import type { PageServerLoad } from './$types';
import { createSeason } from '$actions/Season';
import { fetchSubmissionsForSeason } from '$actions/Submission';
import { createSeasonDTO } from '$lib/DTO/SeasonDTO';
import { fail, type Action, type Actions } from '@sveltejs/kit';
import type { SelectedFilter } from '$lib/DTO/SelectedFilter';

const createAction: Action = async ({ request }) => {
	const seasonDTO = createSeasonDTO(await request.formData());

	const response = await createSeason(seasonDTO);

	if (response.type === 'error') {
		return fail(400, response.errors);
	}

	return {
		status: 201,
		id: response.data.id
	};
};

export const load: PageServerLoad = async ({ params, url }) => {
	const id = Number(params.id);

	const user = url.searchParams.get('user');
	const date = url.searchParams.get('date');
	const state = url.searchParams.get('state');
	const activity = url.searchParams.get('activity');
	const week = url.searchParams.get('week');
	const faculty = url.searchParams.get('faculty');
	const page = url.searchParams.get('page');

    const accepted = state === 'accepted' ? '1' : state === 'rejected' ? '0' : undefined;
    const reviewed = state === 'pending' ? '0' : undefined;

	const filter: SelectedFilter = {
		user: user && user !== '' ? user : undefined,
		date: date && date !== '' ? date : undefined,
		accepted,
        reviewed,
		activity: activity && activity !== '' ? activity : undefined,
		week: week && week !== '' ? week : undefined,
		faculty: faculty && faculty !== '' ? faculty : undefined,
		page: page && page !== '' && !isNaN(Number(page)) ? Number(page) : undefined
	};

	const submissions = await fetchSubmissionsForSeason({ id }, filter);

	return {
        filter,
		submissions,
	};
};

export const actions: Actions = {
	create: createAction
};
