import type { UserRole } from './UserRole';

export type UserEditDTO = {
	email?: string;
	first_name?: string;
	last_name?: string;
	faculty?: number;
	banned?: number;
	roles?: UserRole[];
};

export const formDataToUserEditDTO = (formData: FormData): UserEditDTO => {
	const email = formData.get('email')?.toString();
	const firstName = formData.get('first_name')?.toString();
	const lastName = formData.get('last_name')?.toString();
	const faculty = Number(formData.get('faculty')?.toString());
	const banned = formData.get('banned')?.toString() === '1' ? 1 : 0;

	const roles: UserRole[] =
		formData.get('admin') === '1' ? ['ROLE_STAFF', 'ROLE_USER'] : ['ROLE_USER'];

	return {
		email,
		first_name: firstName,
		last_name: lastName,
		faculty,
		banned,
		roles
	};
};
