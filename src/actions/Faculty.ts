import axios, { type AxiosResponse } from 'axios';
import type { Faculty } from '$lib/DTO/Faculty';

export const fetchFaculties = async (): Promise<Array<Faculty>> => {
	return await axios
		.get(`/faculty`)
		.then((response: AxiosResponse<Array<Faculty>>) => response.data)
		.catch(() => new Array<Faculty>());
};
