import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';

export type CharityDTO = {
	id: number;
	name: string;
	description: string | null;
	image: string | null;
	website: string | null;
};

export type CharityCreateDTO = Omit<CharityDTO, 'id' | 'image'> & { image_uuid: string | null };
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

export const createCharityUpdateDTO = (formData: FormData): CharityUpdateResponse => {
	const name = formData.get('name') as string;
	const description = formData.get('description') as string;
	const website = formData.get('website') as string;
	const imageUuid = formData.get('image_uuid') as string;

	let errors: CharityError = {};

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
		type: 'success',
		data: {
			name: name,
			description: description,
			image_uuid: imageUuid,
			website: website
		}
	};
};

export const createCharityDTO = (formData: FormData): CharityCreateReturn => {
	const name = formData.get('name') as string;
	const description = formData.get('description') as string;
	const website = formData.get('website') as string;
	const imageUuid = formData.get('image_uuid') as string;

	let errors: CharityError = {};

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
			description: description,
			image_uuid: imageUuid === '' ? null : imageUuid,
			website: website
		}
	};
};
