import { formDataToSubmissionDTO } from '$lib/DTO/SubmissionDTO';
import type { RequestHandler } from '@sveltejs/kit';

const createAction: RequestHandler = async ({ request }): Promise<any> => {
	let dto = formDataToSubmissionDTO(await request.formData());
	console.log(dto);
};

export const actions = {
	create: createAction
};
