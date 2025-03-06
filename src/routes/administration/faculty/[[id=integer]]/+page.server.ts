import { createFaculty, deleteFaculty, updateFaculty } from '$actions/Faculty';
import { createFacultyDTO } from '$lib/DTO/FacultyDTO';
import { fail, type Actions, type Action } from '@sveltejs/kit';

const createAction: Action = async ({ request }) => {
    const facultyDTO = createFacultyDTO(await request.formData());
    
    if (facultyDTO.type === 'error') {
        return fail(400, { faculty: facultyDTO.errors });
    }

    const response = await createFaculty(facultyDTO.data);

    if (response.type === 'error') {
        return fail(400, { faculty: response.errors });
    }

    return {
        id: response.data.id
    };
};

const updateAction: Action = async ({ request, params }) => {
    const facultyDTO = createFacultyDTO(await request.formData());

    if (facultyDTO.type === 'error') {
        return fail(400, { faculty: facultyDTO.errors });
    }

    const id = Number(params.id);

    const response = await updateFaculty(id, facultyDTO.data);

    if (response.type === 'error') {
        return fail(400, { faculty: response.errors });
    }

    return {
        status: 200
    };
};

const deleteAction: Action = async ({ request, params }) => {
    const facultyDTO = createFacultyDTO(await request.formData());

    if (facultyDTO.type === 'error') {
        return fail(400, { faculty: facultyDTO.errors });
    }

    const id = Number(params.id);

    const response = await deleteFaculty(id);

    if (response.type === 'error') {
        return fail(400, { faculty: response.errors });
    }

    return {
        status: 200
    };
};

export const actions: Actions = {
    create: createAction,
    update: updateAction,
    delete: deleteAction
};
