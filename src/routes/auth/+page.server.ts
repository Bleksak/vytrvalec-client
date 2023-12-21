import { login } from '$actions/Auth';
import { formDataToUserLoginDTO } from '$lib/DTO/UserLoginDTO';
import { fail, redirect, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { register } from '$actions/Auth';
import { formDataToUserRegisterDTO } from '$lib/DTO/UserRegisterDTO';

const loginAction: RequestHandler = async ({ cookies, request }): Promise<any> => {
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

	return { success: true };
};

const logoutAction: RequestHandler = ({ cookies }): Promise<any> => {
	cookies.delete('jwt', { path: '/' });
	axios.defaults.headers.common.Authorization = null;

	redirect(307, '/');
};

const registerAction: RequestHandler = async ({ request }): Promise<any> => {
	const registerDTO = formDataToUserRegisterDTO(await request.formData());

	if (registerDTO.type === 'error') {
		return fail(400, { register: registerDTO.value });
	}

	const result = await register(registerDTO.value);

	if (result.type === 'error') {
		return fail(400, { register: result.errors });
	}

	return { status: 201 };
};

export const actions = {
	login: loginAction,
	logout: logoutAction,
	register: registerAction
};
