import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';

export type SubmissionStateDTO = {
	updated_at: string;
	state: number;
	message?: string;
};

export type SubmissionStateError = ResponseErrorMap<SubmissionStateDTO> & {
	server?: Array<ResponseError>;
};

export type SubmissionStateResponse =
	| {
			type: 'success';
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
	const state = formData.get('state')?.toString();
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
				state: state === '1' ? 1 : 0
			}
		};
	}

	return {
		type: 'success',
		dto: {
			updated_at: updated_at!,
			state: state === '1' ? 1 : 0,
			message
		}
	};
};
