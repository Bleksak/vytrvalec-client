import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import { type } from 'arktype';
import { TranslationObjectType } from './TranslationObjectDTO';

export const CharityType = type({
	id: 'number.integer > 0',
	name: TranslationObjectType,
	description: TranslationObjectType,
	image: 'string.url|null',
	website: 'string.url|null'
});

export const CharityCreateTranslationType = type({
	name: TranslationObjectType,
	description: TranslationObjectType
});

export const CharityCreateType = type({
	'image?': 'string.uuid.v7 | ""',
	'website?': type.or(
		type('string.url'),
		type('""'),
	),
	translations: CharityCreateTranslationType
});

export type CharityDTO = typeof CharityType.infer;

export type CharityCreateDTO = typeof CharityCreateType.infer;
export type CharityUpdateDTO = Partial<CharityCreateDTO>;

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
