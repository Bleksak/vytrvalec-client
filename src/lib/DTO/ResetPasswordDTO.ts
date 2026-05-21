import { PasswordEstimator } from '$lib/PasswordEstimator';
import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';

export type ResetPasswordDTO = {
    password: string;
    password_reset_token: string;
};

export type ResetError = ResponseErrorMap<ResetPasswordDTO> & {
    password?: Array<ResponseError>;
    server?: Array<ResponseError>;
};

export type ResetPasswordResponse =
    | {
          type: 'success';
      }
    | {
          type: 'error';
          errors: ResetError;
      };

export type ResetPasswordReturn =
    | {
          type: 'dto';
          value: ResetPasswordDTO;
      }
    | {
          type: 'error';
          value: ResetError;
      };

export const formDataToResetPasswordDTO = (formData: FormData): ResetPasswordReturn => {
    const password = formData.get('password')?.toString();
    const passwordRepeat = formData.get('passwordRepeat')?.toString();
    const passwordResetToken = formData.get('passwordResetToken')?.toString();

    const errors: ResetError = {};

    if (password !== passwordRepeat) {
        errors.password = ['password_mismatch'];
    }

    if (password === undefined || password === '') {
        errors.password = ['blank'];
    }

    const strength = PasswordEstimator.estimateStrength(password);

    if (strength < 2) {
        errors.password = ['weak'];
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
            password: password!,
            password_reset_token: passwordResetToken!,
        },
    };
};
