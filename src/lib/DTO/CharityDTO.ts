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
		data: CharityDTO
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
	  

export const createCharityDTO = (formData: FormData): CharityCreateReturn => {
	const name = formData.get('name') as string;
	const description = formData.get('description') as string;

	let errors: CharityError = {}

	if (!name || name === '') {
		errors['name'] = ['blank'];
	}

	if (!description || description === '') {
		errors['description'] = ['blank'];
	}

	if (Object.keys(errors).length !== 0) {
		return { type: 'error', errors: errors };
	}

	return {
		type: 'dto',
		data: {
			name: name,
			description: description
		}
	};
};
