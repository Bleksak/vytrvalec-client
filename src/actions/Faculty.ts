import axios, { type AxiosResponse } from "axios";
import type { Faculty } from "$lib/DTO/Faculty";
import { baseUrl } from "$lib/API";


export const fetchFaculties = async (): Promise<Array<Faculty>> => {
    return await axios.get(`${baseUrl}/faculty`)
        .then((response: AxiosResponse<Array<Faculty>>) => response.data)
        .catch(() => new Array<Faculty>());
}
