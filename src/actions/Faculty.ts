import axios, { type AxiosResponse } from "axios";
import { baseUrl } from "$lib/API";


export const fetchFaculties = async (): Promise<AxiosResponse<Faculty[]>> => {
    return await axios.get(`${baseUrl}/faculty`);
}
