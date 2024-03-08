import { createCharity, updateCharity } from '$actions/Charity';
import { createCharityDTO } from '$lib/DTO/CharityDTO';
import { fail, type Actions, type Action } from '@sveltejs/kit';

const createAction: Action = async ({ request }) => {
	const charityDTO = createCharityDTO(await request.formData());
	
	if (charityDTO.type === 'error') {
		return fail(400, { charity: charityDTO.errors });
	}

	const response = await createCharity(charityDTO.data);

	if (response.type === 'error') {
		return fail(400, { charity: response.errors });
	}

	return {
		id: response.data.id
	};
};

const updateAction: Action = async ({ request, params }) => {
	const charityDTO = createCharityDTO(await request.formData());

	if (charityDTO.type === 'error') {
		return fail(400, { charity: charityDTO.errors });
	}

	const id = Number(params.id);

	const response = await updateCharity(id, charityDTO.data);

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
