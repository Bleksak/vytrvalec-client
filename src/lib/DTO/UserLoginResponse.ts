import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import type { UserLoginDTO } from './UserLoginDTO';
import type { UserResponse } from './UserResponse';

export type LoginResponseSuccess = {
	token: string;
	user: UserResponse;
};

export type LoginError = ResponseErrorMap<UserLoginDTO> & {
	auth?: Array<ResponseError>;
};

export type UserLoginResponse =
	| {
			type: 'success';
			response: LoginResponseSuccess;
	  }
	| {
			type: 'error';
			errors: LoginError;
	  };
