export type UserLoginDTO = {
    email: string,
    password: string,
};

export type UserLoginErrors = Map<string, string>;

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

    const errors = new Map<string, string>();

    if (email === undefined) {
        errors.set('email', 'blank');
    }

    if (password === undefined) {
        errors.set('password', 'blank');
    }

    if (errors.size !== 0) {
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
