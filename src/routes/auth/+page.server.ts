import { accountChange, gdprConsentChange, login, requestResetPassword, resetPassword } from '$actions/Auth';
import { formDataToUserLoginDTO } from '$lib/DTO/UserLoginDTO';
import { fail, redirect, type Action } from '@sveltejs/kit';
import axios from 'axios';
import { register } from '$actions/Auth';
import { formDataToUserRegisterDTO } from '$lib/DTO/UserRegisterDTO';
import { type Actions } from '@sveltejs/kit';
import { formDataToAccountChangeDTO } from '$lib/DTO/AccountChangeDTO';
import { formDataToForgottenPasswordDTO } from '$lib/DTO/ForgottenPasswordDTO';
import { formDataToResetPasswordDTO } from '$lib/DTO/ResetPasswordDTO';
import { formDataToConsentChangeDTO } from '$lib/DTO/ConsentChangeDTO';

const loginAction: Action = async ({ cookies, request }) => {
    const loginDTO = formDataToUserLoginDTO(await request.formData());

    if (loginDTO.type === 'error') {
        return fail(400, loginDTO.value);
    }

    const result = await login(loginDTO.value);

    if (result.type === 'error') {
        return fail(400, result.errors);
    }

    const token = result.response.token;
    cookies.set('jwt', token, { path: '/' });

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const logoutAction: Action = ({ cookies }) => {
    cookies.delete('jwt', { path: '/' });
    axios.defaults.headers.common.Authorization = null;

    redirect(307, '/');
};

const registerAction: Action = async ({ request }) => {
    const registerDTO = formDataToUserRegisterDTO(await request.formData());

    if (registerDTO.type === 'error') {
        return fail(400, { register: registerDTO.value });
    }

    const result = await register(registerDTO.value);

    if (result.type === 'error') {
        return fail(400, { register: result.errors });
    }
};

const accountAction: Action = async ({ request, locals }) => {
    const data = formDataToAccountChangeDTO(locals.user, await request.formData());
    if (data.type === 'error') {
        return fail(400, data.errors);
    }

    const response = await accountChange(data.dto);
    if (response.type === 'error') {
        return fail(400, response.errors);
    }
};

const forgottenPasswordAction: Action = async ({ request }) => {
    const formData = await request.formData();
    const data = formDataToForgottenPasswordDTO(formData);
    if (data.type === 'error') {
        return fail(400, data.value);
    }

    const response = await requestResetPassword(data.value, formData.get('lang')?.toString() ?? 'cs');
    if (response.type === 'error') {
        return fail(400, response.errors);
    }
};

const resetAction: Action = async ({ request }) => {
    const data = formDataToResetPasswordDTO(await request.formData());
    if (data.type === 'error') {
        return fail(400, data.value);
    }

    const response = await resetPassword(data.value);

    if (response.type === 'error') {
        return fail(400, response.errors);
    }

    return redirect(307, '/');
};

const consentAction: Action = async ({ request }) => {
    const data = formDataToConsentChangeDTO(await request.formData());

    if (data.type === 'error') {
        return fail(400, data.value);
    }

    const response = await gdprConsentChange(data.value);

    if (response.type === 'error') {
        return fail(400, response.errors);
    }

    return { status: response.type };
};


export const actions: Actions = {
    login: loginAction,
    logout: logoutAction,
    register: registerAction,
    account: accountAction,
    forgotten: forgottenPasswordAction,
    reset: resetAction,
    consent: consentAction
};
