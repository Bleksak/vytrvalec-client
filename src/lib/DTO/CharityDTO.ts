import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';

export type CharityDTO = {
	id: number;
	name: string;
	description: string;
};

export type CharityCreateDTO = Omit<CharityDTO, 'id'>;

export type CharityCreateData = {
	id: number;
};

export type CharityError = ResponseErrorMap<CharityDTO> & {
	auth?: Array<ResponseError>;
};
export type CharityCreateResponse =
	| {
			type: 'success';
			data: CharityCreateData;
	  }
	| {
			type: 'error';
			errors: CharityError;
	  };

export type CharityUpdateResponse =
	| {
			type: 'success';
	  }
	| {
			type: 'error';
			errors: CharityError;
	  };

export const createCharityDTO = (formData: FormData): CharityCreateDTO => {
	return {
		name: formData.get('name') as string,
		description: formData.get('description') as string
	};
};
