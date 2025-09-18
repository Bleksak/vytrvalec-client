import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import { type } from 'arktype';
import { TranslationObjectPartialType, TranslationObjectType } from './TranslationObjectDTO';
import { EmptyStringAsNullType } from './EmptyStringAsUndefinedType';

export const CharityType = type({
	id: 'number.integer > 0',
	name: TranslationObjectType,
	description: TranslationObjectType,
	'image?': type.or('string.url', EmptyStringAsNullType, 'null'),
	'website?': type.or('string.url', EmptyStringAsNullType, 'null')
});

export const CharityCreateTranslationType = type({
	name: TranslationObjectType,
	description: TranslationObjectType
});

export const CharityUpdateTranslationType = type({
	'name?': TranslationObjectPartialType,
	'description?': TranslationObjectPartialType
});

export const CharityCreateType = type({
	'image?': 'string.uuid.v7 | ""',
	'website?': type.or(type('string.url'), type('""')),
	translations: CharityCreateTranslationType
});

export const CharityUpdateType = type({
	id: type('string.integer.parse').narrow((n, ctx) => {
		if (n < 0) {
			return ctx.reject({
				message: 'negative'
			});
		}

		return true;
	}),
	'image?': 'string.uuid.v7 | ""',
	'website?': type.or(type('string.url'), type('""')),
	'translations?': CharityUpdateTranslationType
});

export type CharityDTO = typeof CharityType.infer;

export type CharityCreateDTO = typeof CharityCreateType.infer;
export type CharityUpdateDTO = typeof CharityUpdateType.infer;

export type CharityUpdateResponse =
	| {
			type: 'success';
			data: CharityUpdateDTO;
	  }
	| {
			type: 'error';
			errors: CharityError;
	  };

export type CharityCreateData = {
	id: number;
};

export type CharityError = ResponseErrorMap<CharityDTO> & {
	auth?: Array<ResponseError>;
};

export type CharityCreate = {};

export type CharityCreateReturn =
	| {
			type: 'dto';
			data: CharityCreateDTO;
	  }
	| {
			type: 'error';
			errors: CharityError;
	  };

export type CharityCreateResponse =
	| {
			type: 'success';
			data: CharityDTO;
	  }
	| {
			type: 'error';
			errors: CharityError;
	  };
