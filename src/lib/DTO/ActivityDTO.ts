import { type } from 'arktype';
import { TranslationObjectPartialType, TranslationObjectType } from './TranslationObjectDTO';

const ActivityType = type({
	id: 'number.integer > 0',
	name: 'string > 0',
	visible: 'boolean',
	min_elevation: 'number.integer >= 0'
});

export type ActivityDTO = typeof ActivityType.infer;

export const CreateActivityType = type({
	name: TranslationObjectType,
	min_elevation: type('string.integer.parse').narrow((n, ctx) => {
		if (n < 0) {
			return ctx.reject({
				message: 'negative',
				expected: 'musí být nezáporné celé číslo'
			});
		}

		return true;
	}),
	image: 'string.uuid.v7'
});

export type CreateActivityDTO = typeof CreateActivityType.infer;

export const UpdateActivityType = type({
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

export type UpdateActivityDTO = typeof UpdateActivityType.infer;

export const CreateActivityResponseType = ActivityType;
export type CreateActivityResponseDTO = ActivityDTO;
