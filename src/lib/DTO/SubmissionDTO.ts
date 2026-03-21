import type { ResponseErrorMap } from '$lib/ResponseErrors';
import type { UserResponseAdmin } from './UserResponse';

import { type } from 'arktype';

export type SubmissionDTO = {
    distance: number;
    elevation?: number;
    image_uuid?: string;
    activity_id: number;
    updated_at?: string;
};

export const SubmissionResponseDto = type({
    id: 'number',
    distance: 'number',
    'elevation?': 'number',
    image: 'string',
    activity_id: 'number',
    accepted: 'boolean',
    reviewed: 'boolean',
    user_id: 'number',
    date: type('string.date').pipe((s) => new Date(s)),
    updated_at: 'string',
    week: 'number',
    season_id: 'number',
    message: 'string',
});

export type SubmissionResponseDtoInfer = typeof SubmissionResponseDto.infer;

export type SubmissionResponseDTO = {
    id: number;
    distance: number;
    elevation?: number;
    image: string;
    activity_id: number;
    accepted: boolean;
    reviewed: boolean;
    user_id: number;
    date: Date;
    updated_at: string;
    week: number;
    season_id: number;
    message: string;
};

export type SubmissionResponseAdminDTO = Omit<SubmissionResponseDTO, 'user'> & {
    user: UserResponseAdmin;
};

export type SubmissionErrors = ResponseErrorMap<SubmissionDTO>;

export type SubmissionReturn =
    | {
          type: 'dto';
          value: SubmissionDTO;
      }
    | {
          type: 'error';
          value: SubmissionErrors;
      };

export const formDataToSubmissionDTO = (formData: FormData): SubmissionReturn => {
    const distanceString = formData.get('distance')?.toString().replace(',', '.');
    const distance = Number(distanceString) * 1000;
    const elevationString = formData.get('elevation')?.toString();
    const elevation = Number(elevationString);
    const activity = Number(formData.get('activity')?.toString());
    const image_uuid = formData.get('image_uuid')?.toString();
    const updated_at = formData.get('updated_at')?.toString();

    let valid = true;
    let errors: SubmissionErrors = {
        distance: [],
        elevation: [],
        activity_id: [],
        image_uuid: [],
    };

    if (distanceString === undefined || distanceString === '' || distanceString === null) {
        valid = false;
        errors.distance?.push('blank');
    }

    if (Number.isNaN(distance) || !Number.isInteger(distance)) {
        valid = false;
        errors.distance?.push('invalid');
    }

    if (Number.isInteger(distance) && distance < 1) {
        valid = false;
        errors.distance?.push('negative');
    }

    if (elevationString !== undefined && elevationString !== '' && elevationString !== null) {
        if (Number.isNaN(elevation) || !Number.isInteger(elevation)) {
            valid = false;
            errors.elevation?.push('invalid');
        }

        if (distance < 0) {
            valid = false;
            errors.elevation?.push('negative');
        }
    }

    if (activity === undefined || activity === null) {
        valid = false;
        errors.activity_id?.push('invalid');
    }

    if (image_uuid === undefined) {
        valid = false;
        errors.image_uuid?.push('invalid');
    }

    if (!valid) {
        return {
            type: 'error',
            value: errors,
        };
    }

    return {
        type: 'dto',
        value: {
            elevation: elevation,
            distance: distance!,
            activity_id: activity!,
            image_uuid: image_uuid == '' ? undefined : image_uuid,
            updated_at: updated_at!,
        },
    };
};
