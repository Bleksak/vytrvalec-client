import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import { BooleanType } from './BooleanType';
import { TranslationObjectPartialType, TranslationObjectType } from './TranslationObjectDTO';
import { type } from 'arktype';

export const FacultyType = type({
	id: 'number',
	name: TranslationObjectType,
	shortcut: '0 < string < 10',
	visible: BooleanType,
	color: 'string'
});

export const FacultyCreateTranslationType = type({
	name: TranslationObjectType
});

export const FacultyUpdateTranslationType = type({
	'name?': TranslationObjectPartialType
});

export const FacultyCreateType = type({
	translations: FacultyCreateTranslationType,
	shortcut: '0 < string < 10',
	visible: BooleanType,
	color: 'string'
});

export const FacultyUpdateType = type({
	id: type('string.integer.parse').narrow((n, ctx) => {
		if (n < 0) {
			return ctx.reject({
				message: 'negative'
			});
		}

		return true;
	}),
	'translations?': FacultyUpdateTranslationType,
	'shortcut?': '0 < string < 10',
	'visible?': BooleanType,
	'color?': 'string'
});

export type FacultyDTO = typeof FacultyType.infer;
export type FacultyCreateDTO = typeof FacultyCreateType.infer;
export type FacultyUpdateDTO = typeof FacultyUpdateType.infer;

export type FacultyCreateError = ResponseErrorMap<FacultyCreateDTO> & {
	auth?: Array<ResponseError>;
};

export type FacultyCreateResponse =
	| {
		type: 'success';
		data: FacultyDTO;
	}
	| {
		type: 'error';
		errors: FacultyCreateError;
	};

export type FacultyUpdateResponse =
	| {
		type: 'success';
	}
	| {
		type: 'error';
		errors: FacultyCreateError;
	};
