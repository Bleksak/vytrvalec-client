import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import { type } from 'arktype';
import { CharityCreateType, CharityType } from './CharityDTO';
import { BooleanType } from './BooleanType';
import { EmptyStringAsNullType } from './EmptyStringAsUndefinedType';

export const FacultyMappingCreateType = type({
    faculty: 'string.numeric.parse',
    'parent': type.or('string.numeric.parse', EmptyStringAsNullType),
});

export const FacultyMappingType = type({
    season_id: 'number',
    faculty_id: 'number',
    'parent_id': 'number|null',
});

export const SeasonCreateType = type({
    start: 'string.date.parse',
    end: 'string.date.parse',
    notify_users: BooleanType.default(false),
    'notification_date?': 'string.date',
    is_test: BooleanType.default(false),
});

export const SeasonType = type({
    id: 'number.integer > 0',
    start: 'string.date.parse',
    end: 'string.date.parse',
    charity: CharityType,
    can_delete: 'boolean',
    is_running: 'boolean',
    is_test: 'boolean',
    faculty_mapping: FacultyMappingType.array(),
});


export const SeasonConfigType = type({
    charity: type.or(CharityCreateType, 'string.integer.parse'),
    faculty_mapping: FacultyMappingCreateType.array(),
    season: SeasonCreateType,
});

export type SeasonConfigDTO = typeof SeasonConfigType.infer;

export type SeasonDTO = typeof SeasonType.infer;

export type CreateSeasonDTO = {
    start: Date;
    end: Date;
    charity_id: number;
};

export type CreateSeasonResponseDTO = {
    id: number;
};

export type CreateSeasonError = ResponseErrorMap<CreateSeasonDTO> & {
    auth?: Array<ResponseError>;
};

export type CreateSeasonResponse =
    | {
        type: 'success';
        data: CreateSeasonResponseDTO;
    }
    | {
        type: 'error';
        errors: CreateSeasonError;
    };

export const createSeasonDTO = (formData: FormData): CreateSeasonDTO => {
    const start = formData.get('start')?.toString() ?? '';
    const end = formData.get('end')?.toString() ?? '';
    const charity_id = Number(formData.get('charity'));

    return {
        start: new Date(start),
        end: new Date(end),
        charity_id
    };
};

