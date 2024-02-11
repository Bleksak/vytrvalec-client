import { createSubmission, patchSubmission, setSubmissionState } from '$actions/Submission';
import { formDataToSubmissionDTO } from '$lib/DTO/SubmissionDTO';
import { formDataToSubmissionStateDTO } from '$lib/DTO/SubmissionStateDTO';
import { fail, type Actions, type Action } from '@sveltejs/kit';

const createAction: Action = async ({ request }) => {
	const formData = await request.formData();
	const dto = formDataToSubmissionDTO(formData);

	if (dto.type === 'error') {
		return fail(400, { submission: dto.value });
	}

	const result = await createSubmission(dto.value);

	if (result.type === 'error') {
		return fail(400, { submission: result.errors });
	}
};

const stateAction: Action = async ({ request }) => {
	const formData = await request.formData();
	const submissionState = formDataToSubmissionStateDTO(formData);

	const submissionId = formData.get('id');

	if (submissionState.type === 'error') {
		return fail(400, { submissionState: submissionState.errors });
	}

	const response = await setSubmissionState(Number(submissionId), submissionState.dto);

	if (response.type === 'error') {
		return fail(400, { submissionState: response.errors });
	}

	return { updated_at: response.date };
};

const patchAction: Action = async ({ request }) => {
	const formData = await request.formData();
	const dto = formDataToSubmissionDTO(formData);
	if (dto.type === 'error') {
		return fail(400, { submission: dto.value });
	}

	const result = await patchSubmission(dto.value, formData);

	if (result.type === 'error') {
		return fail(400, { submission: result.errors });
	}
}

export const actions: Actions = {
	create: createAction,
	state: stateAction,
	patch: patchAction
};
