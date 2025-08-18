import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type {
	FacultyCreateDTO,
	FacultyCreateResponse,
	FacultyDTO,
	// FacultyEditResponse
} from '$lib/DTO/FacultyDTO';

export const fetchFaculties = async (api: AxiosInstance = axios): Promise<Array<FacultyDTO>> => {
	return await api
		.get(`/faculty`)
		.then((response: AxiosResponse<Array<FacultyDTO>>) => response.data)
		.catch(() => new Array<FacultyDTO>());
};

export const createFaculty = async (
	api: AxiosInstance = axios,
	faculty: FacultyCreateDTO
): Promise<FacultyCreateResponse> => {
	const response = await api.post('/faculty', faculty).catch((error) => {
		if (error.response) {
			return error.response;
		}

		return null;
	});

	if (response === null) {
		return {
			type: 'error',
			errors: { auth: ['server_down'] }
		};
	}

	if (response.status !== 201) {
		return {
			type: 'error',
			errors: response.data
		};
	}

	return {
		type: 'success',
		data: response.data
	};
};

// export const updateFaculty = async (
// 	id: number,
// 	data: FacultyCreateDTO
// ): Promise<FacultyEditResponse> => {
// 	const response = await axios.patch(`/faculty/${id}`, data).catch((error) => {
// 		if (error.response) {
// 			return error.response;
// 		}

// 		return null;
// 	});

// 	if (response === null) {
// 		return {
// 			type: 'error',
// 			errors: { auth: ['server_down'] }
// 		};
// 	}

// 	if (response.status !== 200) {
// 		return {
// 			type: 'error',
// 			errors: response.data
// 		};
// 	}

// 	return {
// 		type: 'success'
// 	};
// };

// export const deleteFaculty = async (id: number): Promise<FacultyEditResponse> => {
// 	const response = await axios.delete(`/faculty/${id}`).catch((error) => {
// 		if (error.response) {
// 			return error.response;
// 		}

// 		return null;
// 	});

// 	if (response === null) {
// 		return {
// 			type: 'error',
// 			errors: { auth: ['server_down'] }
// 		};
// 	}

// 	if (response.status !== 200) {
// 		return {
// 			type: 'error',
// 			errors: response.data
// 		};
// 	}

// 	return {
// 		type: 'success'
// 	};
// };
