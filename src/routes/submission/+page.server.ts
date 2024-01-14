import { createSubmission } from '$actions/Submission';
import { formDataToSubmissionDTO } from '$lib/DTO/SubmissionDTO';
import { fail, type Actions, type Action } from '@sveltejs/kit';

const createAction: Action = async ({ request }) => {
	let dto = formDataToSubmissionDTO(await request.formData());

	if (dto.type === 'error') {
		return fail(400, { submission: dto.value });
	}

	const result = await createSubmission(dto.value);

	if (result.type === 'error') {
		return fail(400, { submission: result.errors });
	}
};

export const actions: Actions = {
	create: createAction
};
