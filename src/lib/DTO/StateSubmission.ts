import type { SubmissionErrors } from './SubmissionDTO';

export type StateSubmissionResponse =
    | {
          type: 'success';
      }
    | {
          type: 'error';
          errors: SubmissionErrors;
      };
