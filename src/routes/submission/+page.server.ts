import { createSubmission } from '$actions/Submission';
import { formDataToSubmissionDTO } from '$lib/DTO/SubmissionDTO';
import { fail, type RequestHandler } from '@sveltejs/kit';

const createAction: RequestHandler = async ({ request }): Promise<any> => {
	let dto = formDataToSubmissionDTO(await request.formData());
	if (dto.type === 'error') {
		return fail(400, { submission: dto.value });
	}

	const result = await createSubmission(dto.value);
	if (result.type === 'error') {
		return fail(400, { submission: result.errors });
	}
};

export const actions = {
	create: createAction
};
