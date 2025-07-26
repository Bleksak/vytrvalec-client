import type { Action, Actions } from '@sveltejs/kit';

const createAction: Action = async ({ request }) => {
	const formData = await request.formData();

};

export const actions: Actions = {
	create: createAction
};
