import { login, register } from "$actions/Auth";
import { goto } from "$app/navigation";
import { formDataToUserLoginDTO } from "$lib/DTO/UserLoginDTO";
import { formDataToUserRegisterDTO } from "$lib/DTO/UserRegisterDTO";
import { fail, redirect, type RequestHandler } from "@sveltejs/kit";

const loginAction: RequestHandler = async ({ cookies, request }): Promise<any> => {
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

    throw redirect(307, '/');
};

const registerAction: RequestHandler = async ({ request }): Promise<any> => {
    const registerDTO = formDataToUserRegisterDTO(await request.formData());

    if (registerDTO.type === 'error') {
        return fail(400, registerDTO.value);
    }

    const result = await register(registerDTO.value);

    if (result.type === 'error') {
        return fail(400, result.errors);
    }

    return { status: 201 }
}

export const actions = {
    login: loginAction,
    register: registerAction,
};
