import { login, register } from "$lib/API";
import { formDataToUserLoginDTO } from "$lib/DTO/UserLoginDTO";
import { formDataToUserRegisterDTO } from "$lib/DTO/UserRegisterDTO";
import { fail, type RequestHandler } from "@sveltejs/kit";

const loginAction: RequestHandler = async ({ request }): Promise<any> => {
    const loginDTO = formDataToUserLoginDTO(await request.formData());

    switch (loginDTO.type) {
        case 'error': return {
            status: 400,
            body: { errors: loginDTO.value },
        };
        case 'dto': {
            await login(loginDTO.value);
        }
    }
};

const registerAction: RequestHandler = async ({ request }): Promise<any> => {
    const registerDTO = formDataToUserRegisterDTO(await request.formData());

    switch (registerDTO.type) {
        case 'error': return fail(400, registerDTO.value);

        case 'dto': {
            const result = await register(registerDTO.value);
            if (result.type === 'success') {
                return { status: 201 }
            }

            return fail(400, result.errors);
        }
    }
}

export const actions = {
    login: loginAction,
    register: registerAction,
};
