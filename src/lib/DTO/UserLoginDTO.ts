import type { LoginErrorMap } from "./UserLoginResponse";

export type UserLoginDTO = {
    email: string,
    password: string,
};

export type UserLoginErrors = LoginErrorMap;

export type UserLoginReturn = {
    type: 'dto',
    value: UserLoginDTO,
} | {
    type: 'error',
    value: UserLoginErrors,
};

export const formDataToUserLoginDTO = (formData: FormData): UserLoginReturn => {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    let errors: LoginErrorMap = {};

    if (email === undefined) {
        errors.email = ['blank'];
    }

    if (password === undefined) {
        errors.password = ['blank'];
    }

    if (Object.keys(errors).length !== 0) {
        return {
            type: 'error',
            value: errors
        };
    }

    return {
        type: 'dto',
        value: {
            email: email!,
            password: password!
        }
    };
}
