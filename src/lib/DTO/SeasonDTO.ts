import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';

export type SeasonDTO = {
	id: number;
	start: Date;
	end: Date;
	charity: number;
};

export type CreateSeasonDTO = Omit<SeasonDTO, 'id'>;

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
	const charity = Number(formData.get('charity')?.toString());

	// TODO: error handling? pouziva se to jen v administraci, tak to tam mozna byt nemusi

	return {
		start: new Date(start),
		end: new Date(end),
		charity: Number(charity)
	};
};
