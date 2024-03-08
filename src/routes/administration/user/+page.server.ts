import { updateUser } from '$actions/administration/Users';
import { formDataToUserEditDTO } from '$lib/DTO/UserEditDTO';
import { fail, type Actions, type RequestHandler } from '@sveltejs/kit';

const updateAction: RequestHandler = async ({ request }): Promise<any> => {
	const formData = await request.formData();
	const userDTO = formDataToUserEditDTO(formData);

	if (userDTO.type === 'error') {
		return fail(400, { errors: userDTO.errors });
	}

	let response = await updateUser(Number(formData.get('id')?.toString()), userDTO.data);

	if (response.type === 'error') {
		return fail(400, { errors: response.errors });
	}

	return { status: response.type };
};

export const actions: Actions = {
	update: updateAction
};
