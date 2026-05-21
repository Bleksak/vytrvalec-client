import type { LoginError } from './UserLoginResponse';

export type UserLoginDTO = {
    email: string;
    password: string;
};

export type UserLoginErrors = LoginError;

export type UserLoginReturn =
    | {
          type: 'dto';
          value: UserLoginDTO;
      }
    | {
          type: 'error';
          value: UserLoginErrors;
      };

export const formDataToUserLoginDTO = (formData: FormData): UserLoginReturn => {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    const errors: LoginError = {};

    if (email === undefined || email === '') {
        errors.email = ['blank'];
    }

    if (password === undefined || password === '') {
        errors.password = ['blank'];
    }

    if (Object.keys(errors).length !== 0) {
        return {
            type: 'error',
            value: errors,
        };
    }

    return {
        type: 'dto',
        value: {
            email: email!,
            password: password!,
        },
    };
};
