import type { Faculty } from './Faculty';
import type { UserError } from './UserEditDTO';
import type { UserRole } from './UserRole';

export type UserResponse = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	banned: boolean;
	roles: UserRole[];
	faculty: Faculty;
};

export type UserUpdateResponse = 
	| {
			type: 'success';
	  }
	| {
			type: 'error';
			errors: UserError;
	  };