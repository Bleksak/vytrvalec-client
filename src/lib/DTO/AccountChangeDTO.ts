import { PasswordEstimator } from '$lib/PasswordEstimator';
import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';

export type AccountChangeDTO = {
    password?: string;
    old_password: string;
    password_repeat?: string;
};

export type AccountChangeErrors = ResponseErrorMap<AccountChangeDTO> & {
    auth?: Array<ResponseError>;
};

export type AccountChangeMaybeDTO =
    | {
          type: 'dto';
          dto: AccountChangeDTO;
      }
    | {
          type: 'error';
          errors: AccountChangeErrors;
      };

export type AccountChangeResponse =
    | {
          type: 'success';
      }
    | {
          type: 'error';
          errors: AccountChangeErrors;
      };

export const formDataToAccountChangeDTO = (formData: FormData): AccountChangeMaybeDTO => {
    const password = formData.get('password')?.toString();
    const password_repeat = formData.get('password_repeat')?.toString();
    const old_password = formData.get('old_password')?.toString();

    if (!old_password || old_password === '') {
        return {
            type: 'error',
            errors: {
                old_password: ['blank'],
            },
        };
    }

    if (!password) {
        return {
            type: 'error',
            errors: {
                password: ['blank'],
            },
        };
    }

    if (password_repeat !== password) {
        return {
            type: 'error',
            errors: {
                password_repeat: ['password_mismatch'],
            },
        };
    }
    const strength = PasswordEstimator.estimateStrength(password);

    if (strength < 2) {
        return {
            type: 'error',
            errors: {
                password: ['weak'],
            },
        };
    }

    return {
        type: 'dto',
        dto: {
            password: password === '' ? undefined : password,
            old_password,
        },
    };
};
