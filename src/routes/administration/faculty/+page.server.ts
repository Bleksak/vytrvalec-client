import { createFaculty, updateFaculty } from '$actions/Faculty';
import { FacultyCreateType, FacultyUpdateType } from '$lib/DTO/FacultyDTO';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';
import { ArkErrors } from 'arktype';
import qs from 'qs';

const createAction: Action = async ({ request, locals }) => {
    const formData = await request.formData();

    const value = qs.parse(new URLSearchParams(formData as any).toString());
    const data = FacultyCreateType(value);

    if (data instanceof ArkErrors) {
        const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

        return fail(422, { errors });
    }

    const result = await createFaculty(locals.axios, data);

    if (result.type === 'error') {
        return fail(422, {
            errors: Object.fromEntries(
                Object.entries(result.errors).map(([key, value]) => [key, String(value)]),
            ),
        });
    }

    return redirect(307, '/administration/faculty');
};

const updateAction: Action = async ({ request, locals }) => {
    const formData = await request.formData();

    const value = qs.parse(new URLSearchParams(formData as any).toString());
    const data = FacultyUpdateType(value);

    if (data instanceof ArkErrors) {
        const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

        return fail(422, { errors });
    }

    const result = await updateFaculty(locals.axios, data.id, data);

    if (result.type === 'error') {
        return fail(422, {
            errors: Object.fromEntries(
                Object.entries(result.errors).map(([key, value]) => [key, String(value)]),
            ),
        });
    }

    return redirect(307, '/administration/faculty');
};

export const actions: Actions = {
    create: createAction,
    update: updateAction,
};
