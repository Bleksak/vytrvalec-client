import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import type { SubmissionDTO } from './SubmissionDTO';

export type SubmissionCreateError = ResponseErrorMap<SubmissionDTO> & {
	server?: Array<ResponseError>;
};

export type SubmissionCreateResponse =
	| {
			type: 'success';
	  }
	| {
			type: 'error';
			errors: SubmissionCreateError;
	  };
