import { TranslationObjectPartialType, TranslationObjectType } from './TranslationObjectDTO';
import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import { type } from 'arktype';

const ActivityType = type({
	id: 'number.integer > 0',
	name: TranslationObjectType,
	visible: 'boolean',
	icon: 'string.url',
	min_elevation: 'number.integer >= 0'
});

export type ActivityDTO = typeof ActivityType.infer;

export const CreateActivityTranslationType = type({
	name: TranslationObjectType
});

export const CreateActivityType = type({
	translations: CreateActivityTranslationType,
	min_elevation: type('string.integer.parse').narrow((n, ctx) => {
		if (n < 0) {
			return ctx.reject({
				message: 'negative',
				expected: 'musí být nezáporné celé číslo'
			});
		}

		return true;
	}),
	icon: 'string.uuid.v7'
});

export type CreateActivityDTO = typeof CreateActivityType.infer;

export const UpdateActivityType = type({
	id: type('string.integer.parse').narrow((n, ctx) => {
		if (n < 0) {
			return ctx.reject({
				message: 'negative',
			});
		}

		return true;
	}),
	'name?': TranslationObjectPartialType,
	'min_elevation?': type('string.integer.parse').narrow((n, ctx) => {
		if (n < 0) {
			return ctx.reject({
				message: 'negative'
			});
		}

		return true;
	}),
	'image?': 'string.uuid.v7'
});

export type ActivityCreateSuccess = ActivityDTO;
export type ActivityCreateError = ResponseErrorMap<ActivityDTO> & {
	auth?: Array<ResponseError>;
};

export type ActivityCreateResponse =
	| {
			type: 'success';
			response: ActivityCreateSuccess;
	  }
	| {
			type: 'error';
			errors: ActivityCreateError;
	  };

export type UpdateActivityDTO = typeof UpdateActivityType.infer;

export type ActivityUpdateSuccess = ActivityDTO;
export type ActivityUpdateError = ResponseErrorMap<ActivityDTO> & {
	auth?: Array<ResponseError>;
};

export type ActivityUpdateResponse =
	| {
			type: 'success';
			response: ActivityUpdateSuccess;
	  }
	| {
			type: 'error';
			errors: ActivityUpdateError;
	  };
