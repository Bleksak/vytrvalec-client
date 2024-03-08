import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import type { UserRole } from './UserRole';

export type UserEditDTO = {
	email?: string;
	first_name?: string;
	last_name?: string;
	faculty?: number;
	banned?: number;
	roles?: UserRole[];
};

export type UserError = ResponseErrorMap<UserEditDTO> & {
	auth?: Array<ResponseError>;
};

export type UserEditReturn =
	| {
		type: 'dto';
		data: UserEditDTO;
	}
	| {
		type: 'error';
		errors: UserError;
	};  

export const formDataToUserEditDTO = (formData: FormData): UserEditReturn => {
	let errors: UserError = {}

	const email = formData.get('email')?.toString();
	const firstName = formData.get('first_name')?.toString();
	const lastName = formData.get('last_name')?.toString();
	const faculty = Number(formData.get('faculty')?.toString());
	const banned = formData.get('banned')?.toString() === '1' ? 1 : 0;

	const roles: UserRole[] =
		formData.get('admin') === '1' ? ['ROLE_STAFF', 'ROLE_USER'] : ['ROLE_USER'];
	
	if (!email || email === '') {
		errors['email'] = ['blank'];
	}
	if (!firstName || firstName === '') {
		errors['first_name'] = ['blank'];
	}
	if (!lastName || lastName === '') {
		errors['last_name'] = ['blank'];
	}
	if (faculty === Number.NaN || !Number.isInteger(faculty)) {
		errors['faculty'] = ['invalid'];
	}
	if (Object.keys(errors).length !== 0) {
		return { type: 'error', errors: errors };
	}
	
	return {
		type: 'dto',
		data: {
			email,
			first_name: firstName,
			last_name: lastName,
			faculty,
			banned,
			roles
		}
	};
};
