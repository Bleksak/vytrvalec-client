import axios from "axios";
import type { UserRegisterDTO } from "./DTO/UserRegisterDTO";
import type { UserLoginDTO } from "./DTO/UserLoginDTO";
import type { UserRegisterResponse } from "./DTO/UserRegisterResponse";

export const baseUrl = "http://vytrvalec.test/api";


export const login = async (loginDTO: UserLoginDTO) => {
    // TODO: not working yet
    return await axios.post(`${baseUrl}/user/login`, loginDTO);
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
