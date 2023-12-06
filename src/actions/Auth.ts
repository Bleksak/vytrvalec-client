import axios from "axios";
import type { UserRegisterDTO } from "$lib/DTO/UserRegisterDTO";
import type { UserRegisterResponse } from "$lib/DTO/UserRegisterResponse";
import { baseUrl } from "$lib/API";

import type { UserLoginDTO } from "$lib/DTO/UserLoginDTO";

export const login = async (loginDTO: UserLoginDTO) => {
    const response = await axios.post(`${baseUrl}/user/login`, loginDTO).catch((error) => {
        return error.response;
    });

    if (response.status === 201) {
        return { type: 'success' };
    }

    return {
        type: 'error',
        errors: response?.data ?? {},
    };
}

export const register = async (registerDTO: UserRegisterDTO): Promise<UserRegisterResponse> => {
    const response = await axios.post(`${baseUrl}/user`, registerDTO).catch((error) => {
        return error.response;
    });

    if (response.status === 201) {
        return { type: 'success' };
    }

    return {
        type: 'error',
        errors: response?.data ?? {},
    };
}
