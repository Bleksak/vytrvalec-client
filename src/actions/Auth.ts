import axios from "axios";
import type { UserRegisterDTO } from "$lib/DTO/UserRegisterDTO";
import type { UserRegisterResponse } from "$lib/DTO/UserRegisterResponse";
import { baseUrl } from "$lib/API";
import type { UserLoginDTO } from "$lib/DTO/UserLoginDTO";
import type { UserLoginResponse} from "$lib/DTO/UserLoginResponse";
import type {LoggedUserResponse} from "$lib/DTO/LoggedUserResponse";

export const login = async (loginDTO: UserLoginDTO): Promise<UserLoginResponse> => {
    const response = await axios.post(`${baseUrl}/user/login`, loginDTO).catch((error) => {
        return error.response;
    });

    if (response.status !== 200) {
        return {
            type: 'error',
            errors: response?.data ?? {},
        };
    }

    return {
        type: 'success',
        response: response.data
    };
}

export const register = async (registerDTO: UserRegisterDTO): Promise<UserRegisterResponse> => {
    const response = await axios.post(`${baseUrl}/user`, registerDTO).catch((error) => {
        return error.response;
    });

    if (response.status !== 201) {
        return {
            type: 'error',
            errors: response?.data ?? {},
        };
    }

    return { type: 'success' };
}

export const getCurrentUser = async (): Promise<LoggedUserResponse> => {
    const response = await axios.get(`${baseUrl}/user/current`).catch((error) => {
        return error.response;
    });

    if(response.status !== 200) {
        return {
            type: 'error',
            errors: response?.data ?? {},
        };
    }
    return {
        type: 'success',
        response: response.data
    }
}
