import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import { UserRole } from './UserRole';

export type UserEditDTO = {
    email?: string;
    first_name?: string;
    last_name?: string;
    faculty_id?: number;
    banned?: boolean;
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
    let errors: UserError = {};

    const email = formData.get('email')?.toString();
    const firstName = formData.get('first_name')?.toString();
    const lastName = formData.get('last_name')?.toString();
    const faculty_id = Number(formData.get('faculty_id')?.toString());
    const banned = Boolean(formData.get('banned'));

    const roles: UserRole[] =
        formData.get('admin') === '1' ? [UserRole.Staff, UserRole.User] : [UserRole.User];

    if (!email || email === '') {
        errors['email'] = ['blank'];
    }
    if (!firstName || firstName === '') {
        errors['first_name'] = ['blank'];
    }
    if (!lastName || lastName === '') {
        errors['last_name'] = ['blank'];
    }
    if (faculty_id === Number.NaN || !Number.isInteger(faculty_id)) {
        errors['faculty_id'] = ['invalid'];
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
            faculty_id,
            banned,
            roles,
        },
    };
};
