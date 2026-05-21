import { createSeason, updateSeasonConfig } from '$actions/Season';
import { SeasonConfigType, SeasonUpdateConfigType } from '$lib/DTO/SeasonDTO';
import { fail, redirect, type Action, type Actions } from '@sveltejs/kit';
import { ArkErrors } from 'arktype';
import qs from 'qs';

const createAction: Action = async ({ request, locals }) => {
    const formData = await request.formData();

    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
        params.append(key, value.toString());
    }

    const parsed = qs.parse(params.toString());
    const data = SeasonConfigType(parsed);

    if (data instanceof ArkErrors) {
        const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

        return fail(422, { errors });
    }

    const result = await createSeason(locals.axios, data);

    if (result.type === 'error') {
        return fail(422, {
            errors: Object.fromEntries(
                Object.entries(result.errors).map(([key, value]) => [key, String(value)]),
            ),
        });
    }

    return redirect(307, '/administration/season');
};

const updateAction: Action = async ({ request, locals }) => {
    const formData = await request.formData();

    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
        params.append(key, value.toString());
    }
    const parsed = qs.parse(params.toString());
    const data = SeasonUpdateConfigType(parsed);

    if (data instanceof ArkErrors) {
        const errors = Object.fromEntries(data.map((err) => [err.path.toString(), err.message]));

        return fail(422, { errors });
    }

    const { id, ...rest } = data;
    const result = await updateSeasonConfig(locals.axios, id, rest);

    if (result.type === 'error') {
        return fail(422, {
            errors: Object.fromEntries(
                Object.entries(result.errors).map(([key, value]) => [key, String(value)]),
            ),
        });
    }

    return redirect(307, '/administration/season');
};

export const actions: Actions = {
    create: createAction,
    update: updateAction,
};
