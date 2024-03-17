import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import type { UserResponse } from './UserResponse';

export type AccountChangeDTO = {
	email?: string;
	password?: string;
	old_password: string;
	password_repeat?: string;
};

export type AccountChangeErrors = ResponseErrorMap<AccountChangeDTO> & {
	auth?: Array<ResponseError>;
};

export type AccountChangeMaybeDTO =
	| {
			type: 'dto';
			dto: AccountChangeDTO;
	  }
	| {
			type: 'error';
			errors: AccountChangeErrors;
	  };

export type AccountChangeResponse =
	| {
			type: 'success';
	  }
	| {
			type: 'error';
			errors: AccountChangeErrors;
	  };

export const formDataToAccountChangeDTO = (
	user: UserResponse,
	formData: FormData
): AccountChangeMaybeDTO => {
	let email = formData.get('email')?.toString();
	const password = formData.get('password')?.toString();
	const password_repeat = formData.get('password_repeat')?.toString();
	const old_password = formData.get('old_password')?.toString();

	if (!old_password || old_password === '') {
		return {
			type: 'error',
			errors: {
				old_password: ['blank']
			}
		};
	}

	if (!email || email === '') {
		return {
			type: 'error',
			errors: {
				email: ['blank']
			}
		};
	}

	if (email === user.email) {
		email = undefined;
	}

	if (!email && !password) {
		return {
			type: 'error',
			errors: {
				email: ['blank'],
				password: ['blank']
			}
		};
	}

	if (password_repeat !== password) {
		return {
			type: 'error',
			errors: {
				password_repeat: ['password_mismatch'],
			}
		};
	}

	return {
		type: 'dto',
		dto: {
			email: email,
			password: password === '' ? undefined : password,
			old_password
		}
	};
};
