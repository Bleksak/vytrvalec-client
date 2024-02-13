import type { ResponseError, ResponseErrorMap } from "$lib/ResponseErrors";

export type ForgottenPasswordResponse = | {
    type: 'success';
} | {
    type: 'error';
    errors: ForgottenPasswordError;
};

export type ForgottenPasswordError = ResponseErrorMap<ForgottenPasswordDTO> & {
    forgotten?: Array<ResponseError>;
};

export type ForgottenPasswordDTO = {
    email: string;
};

export type ForgottenPasswordReturn =
    | {
        type: 'dto';
        value: ForgottenPasswordDTO;
    }
    | {
        type: 'error';
        value: ForgottenPasswordError;
    };

export const formDataToForgottenPasswordDTO = (formData: FormData): ForgottenPasswordReturn => {
    const email = formData.get('email')?.toString();

    let errors: ForgottenPasswordError = {};

    if (email === undefined || email === '') {
        errors.email = ['blank'];
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
        }
    };
};
