import { baseUrl } from '$lib/API';
import type { SubmissionDTO } from '$lib/DTO/SubmissionDTO';
import axios from 'axios';

export const createSubmission = async (dto: SubmissionDTO) => {
	const response = await axios.post(`${baseUrl}/submission`, dto).catch((error) => {
		if (error.response) {
			return error.response;
		}

		return null;
	});

	if (response === null) {
		return {
			type: 'error',
			errors: ['server_down']
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
