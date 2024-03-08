import { createSeason } from '$actions/Season';
import { createSeasonDTO } from '$lib/DTO/SeasonDTO';
import { fail, type Action, type Actions } from '@sveltejs/kit';

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

export const actions: Actions = {
	create: createAction
};
