import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import type { UserRegisterDTO } from './UserRegisterDTO';

export type RegistrationResponseSuccess = {};

export type RegistrationError = ResponseErrorMap<UserRegisterDTO> & {
	auth?: Array<ResponseError>;
	gdpr?: Array<ResponseError>;
};

export type UserRegisterResponse =
	| {
			type: 'success';
	  }
	| {
			type: 'error';
			errors: RegistrationError;
	  };
