import { createCharity, updateCharity } from '$actions/Charity';
import { createCharityDTO } from '$lib/DTO/CharityDTO';
import { fail, type Actions, type Action } from '@sveltejs/kit';

const createAction: Action = async ({ request }) => {
	const data = createCharityDTO(await request.formData());

	const response = await createCharity(data);

	if (response.type === 'error') {
		return fail(400, { charity: response.errors });
	}

	return {
		id: response.data.id
	};
};

const updateAction: Action = async ({ request, params }) => {
	const data = createCharityDTO(await request.formData());

	const id = Number(params.id);

	const response = await updateCharity(id, data);

	if (response.type === 'error') {
		return fail(400, { charity: response.errors });
	}

	return {
		status: 200
	};
};

export const actions: Actions = {
	create: createAction,
	update: updateAction
};
