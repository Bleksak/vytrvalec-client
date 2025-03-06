import type { FacultyDTO } from './FacultyDTO';
import type { UserError } from './UserEditDTO';
import type { UserRole } from './UserRole';

export type AnonymizedUser = {
  firstName: string;
  lastName: string | null;
};

export type UserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  banned: boolean;
  roles: UserRole[];
  faculty: FacultyDTO;
  acceptedGdpr: boolean | null;
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

