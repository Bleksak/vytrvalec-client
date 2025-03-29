import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';

export type SubmissionStateDTO = {
	updated_at: string;
	state: SubmissionStateType;
	message?: string;
};

type SubmissionStateType = '1' | '0';

export type SubmissionStateError = ResponseErrorMap<SubmissionStateDTO> & {
	server?: Array<ResponseError>;
	submission_state?: Array<ResponseError>;
};

export type SubmissionStateResponse =
	| {
			type: 'success';
			date: string;
	  }
	| {
			type: 'error';
			errors: SubmissionStateError;
	  };

export type SubmissionStateReturn =
	| {
			type: 'success';
			dto: SubmissionStateDTO;
	  }
	| {
			type: 'error';
			errors: SubmissionStateError;
	  };

export const formDataToSubmissionStateDTO = (formData: FormData): SubmissionStateReturn => {
	const updated_at = formData.get('updated_at')?.toString();
	const state = formData.get('state')?.toString() as SubmissionStateType;
	const message = formData.get('message')?.toString();

	if (updated_at === null) {
		return {
			type: 'error',
			errors: {
				updated_at: ['blank']
			}
		};
	}

	if (state === null) {
		return {
			type: 'error',
			errors: {
				state: ['blank']
			}
		};
	}

	if (message == null) {
		return {
			type: 'success',
			dto: {
				updated_at: updated_at!,
				state: state!
			}
		};
	}

	return {
		type: 'success',
		dto: {
			updated_at: updated_at!,
			state: state!,
			message
		}
	};
};
