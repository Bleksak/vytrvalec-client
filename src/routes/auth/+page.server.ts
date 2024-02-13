import { accountChange, login, resetPassword } from '$actions/Auth';
import { formDataToUserLoginDTO } from '$lib/DTO/UserLoginDTO';
import { fail, redirect, type Action } from '@sveltejs/kit';
import axios from 'axios';
import { register } from '$actions/Auth';
import { formDataToUserRegisterDTO } from '$lib/DTO/UserRegisterDTO';
import { type Actions } from '@sveltejs/kit';
import { formDataToAccountChangeDTO } from '$lib/DTO/AccountChangeDTO';
import { formDataToForgottenPasswordDTO } from '$lib/DTO/ForgottenPasswordDTO';

const loginAction: Action = async ({ cookies, request }) => {
	const loginDTO = formDataToUserLoginDTO(await request.formData());

	if (loginDTO.type === 'error') {
		return fail(400, { login: loginDTO.value });
	}

	const result = await login(loginDTO.value);

	if (result.type === 'error') {
		return fail(400, { login: result.errors });
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
		return fail(400, { forgotten: data.value });
	}

	const response = await resetPassword(data.value, formData.get('lang') as string);
	if (response.type === 'error') {
		return fail(400, response.errors);
	}

}

export const actions: Actions = {
	login: loginAction,
	logout: logoutAction,
	register: registerAction,
	account: accountAction,
	forgotten: forgottenPasswordAction
};
