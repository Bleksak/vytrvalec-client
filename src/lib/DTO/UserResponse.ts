import { type } from 'arktype';
import { FacultyType, type FacultyDTO } from './FacultyDTO';
import type { UserError } from './UserEditDTO';
import { UserRole } from './UserRole';

export type AnonymizedUser = {
    first_name: string;
    last_name: string | null;
};

export const UserResponseDto = type({
    id: 'number',
    first_name: 'string',
    last_name: 'string',
    email: 'string',
    banned: 'boolean',
    roles: type.valueOf(UserRole).array(),
    faculty: type(FacultyType),
    anonymize: 'boolean | null',
    mailing: 'boolean',
});

export type UserResponseDtoInfer = typeof UserResponseDto.infer;

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
