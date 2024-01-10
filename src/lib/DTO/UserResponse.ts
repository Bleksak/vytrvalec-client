import type { Faculty } from './Faculty';
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
