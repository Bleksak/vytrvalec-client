import { updateUser } from '$actions/administration/Users';
import { formDataToUserEditDTO } from '$lib/DTO/UserEditDTO';
import type { Actions, RequestHandler } from '@sveltejs/kit';

const updateAction: RequestHandler = async ({ request }): Promise<any> => {
	const formData = await request.formData();
	const data = formDataToUserEditDTO(formData);

	let response = await updateUser(Number(formData.get('id')?.toString()), data);

	return { status: response.status };
};

export const actions: Actions = {
	update: updateAction
};
