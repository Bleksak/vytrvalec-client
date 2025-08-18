import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import { BooleanType } from './BooleanType';
import { TranslationObjectPartialType, TranslationObjectType } from './TranslationObjectDTO';
import { type } from 'arktype';

export const FacultyType = type({
	id: 'number',
	name: TranslationObjectType,
	shortcut: '0 < string < 10',
	visible: BooleanType,
	'parent?': 'string.integer.parse | number.integer | null',
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
	'parent?': type('string | null')
		.pipe((value, ctx) => {
			if (value === '' || value === null) {
				return null;
			}

			const newValue = parseInt(value, 10);

			if (Number.isNaN(newValue)) {
				return ctx.error({
					message: 'invalid'
				});
			}

			return newValue;
		})
		.or('number.integer'),
	color: 'string'
});

export const FacultyUpdateType = type({
	'id?': 'number'
	'translations?': FacultyUpdateTranslationType,
	'shortcut?': '0 < string < 10',
	'visible?': BooleanType,
	'parent?': type('string | null')
		.pipe((value, ctx) => {
			if (value === '' || value === null) {
				return null;
			}

			const newValue = parseInt(value, 10);

			if (Number.isNaN(newValue)) {
				return ctx.error({
					message: 'invalid'
				});
			}

			return newValue;
		})
		.or('number.integer'),
	'color?': 'string'
});

export type FacultyDTO = typeof FacultyType.infer;
export type FacultyCreateDTO = typeof FacultyCreateType.infer;

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

// export type FacultyEditResponse =
// 	| {
// 			type: 'success';
// 	  }
// 	| {
// 			type: 'error';
// 			errors: FacultyError;
// 	  };
