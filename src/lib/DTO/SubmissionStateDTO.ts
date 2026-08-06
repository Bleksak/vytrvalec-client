import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import type { SubmissionState } from '$lib/enums/SubmissionState';

export type SubmissionStateDTO = {
    updated_at: string;
    state: SubmissionState;
    message?: string;
};

export type SubmissionStateError = ResponseErrorMap<SubmissionStateDTO> & {
    server?: Array<ResponseError>;
    submission_state?: Array<ResponseError>;
};

export type SubmissionStateResponse =
    | {
          type: 'success';
          date: string;
      }
    | {
          type: 'error';
          errors: SubmissionStateError;
      };

export type SubmissionStateReturn =
    | {
          type: 'success';
          dto: SubmissionStateDTO;
      }
    | {
          type: 'error';
          errors: SubmissionStateError;
      };

export const formDataToSubmissionStateDTO = (formData: FormData): SubmissionStateReturn => {
    const updated_at = formData.get('updated_at')?.toString();
    const state = formData.get('state')?.toString() === '1' ? 'accepted' : 'rejected';
    const message = formData.get('message')?.toString();

    if (updated_at === null) {
        return {
            type: 'error',
            errors: {
                updated_at: ['blank'],
            },
        };
    }

    if (message == null) {
        return {
            type: 'success',
            dto: {
                updated_at: updated_at!,
                state: state!,
            },
        };
    }

    return {
        type: 'success',
        dto: {
            updated_at: updated_at!,
            state: state!,
            message,
        },
    };
};
