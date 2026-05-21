import { updateUser } from '$actions/administration/Users';
import { formDataToUserEditDTO } from '$lib/DTO/UserEditDTO';
import { type Action, type Actions, fail } from '@sveltejs/kit';

const updateAction: Action = async ({ request, locals }) => {
    const formData = await request.formData();
    const userDTO = formDataToUserEditDTO(formData);

    if (userDTO.type === 'error') {
        return fail(400, { errors: userDTO.errors });
    }

    const response = await updateUser(
        locals.axios,
        Number(formData.get('id')?.toString()),
        userDTO.data,
    );

    if (response.type === 'error') {
        return fail(400, { errors: response.errors });
    }

    return { success: true };
};

export const actions: Actions = {
    update: updateAction,
};
