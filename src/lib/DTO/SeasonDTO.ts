import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';
import { type } from 'arktype';
import { CharityType, type CharityDTO } from './CharityDTO';

export const SeasonType = type({
	id: 'number.integer > 0',
	start: 'string.date.parse',
	end: 'string.date.parse',
	charity: CharityType,
	can_delete: 'boolean',
	is_running: 'boolean'
});

export type SeasonDTO = typeof SeasonType.infer;

export type FullSeasonDTO = {
	id: number;
	start: Date;
	end: Date;
	charity: CharityDTO;
	can_delete: boolean;
	is_running: boolean;
};

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
