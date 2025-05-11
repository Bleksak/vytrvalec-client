import type { FacultyDTO } from './FacultyDTO';
import type { UserError } from './UserEditDTO';
import type { UserRole } from './UserRole';

export type AnonymizedUser = {
	first_name: string;
	last_name: string | null;
};

export type UserResponse = {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	banned: boolean;
	roles: UserRole[];
	faculty: FacultyDTO;
	anonymize: boolean | null;
	mailing: boolean;
};

export type UserResponseAdmin = Omit<UserResponse, 'faculty'> & {
	faculty: number;
};

export type UserUpdateResponse =
	| {
			type: 'success';
	  }
	| {
			type: 'error';
			errors: UserError;
	  };
