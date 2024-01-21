import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
import type { SubmissionCreateResponse } from '$lib/DTO/SubmissionCreateResponse';
import type { SubmissionDTO, SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
import type { SubmissionStateDTO, SubmissionStateResponse } from '$lib/DTO/SubmissionStateDTO';
import axios from 'axios';

export const createSubmission = async (dto: SubmissionDTO): Promise<SubmissionCreateResponse> => {
	const formData = new FormData();
	formData.append('activity', dto.activity.toString());
	formData.append('image', dto.image);
	formData.append('distance', dto.distance.toString());

	if (dto.elevation) {
		formData.append('elevation', dto.elevation.toString());
	}

	const response = await axios
		.post(`/submission`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
		.catch((error) => {
			if (error.response) {
				return error.response;
			}

			return null;
		});

	if (response === null) {
		return {
			type: 'error',
			errors: { server: ['server_down'] }
		};
	}

	if (response.status !== 201) {
		return {
			type: 'error',
			errors: response.data
		};
	}

	return {
		type: 'success'
	};
};

export const fetchSubmissionsForSeason = async (
	season: SeasonDTO
): Promise<SubmissionResponseDTO[]> => {
	return ((await axios.get(`/season/${season.id}/submissions`).catch(() => null))?.data ?? []).map(
		(submission: { date: string | Date }) => {
			submission.date = new Date(submission.date);
			return submission;
		}
	);
};

export const setSubmissionState = async (
	submissionId: number,
	submissionStateDTO: SubmissionStateDTO
): Promise<SubmissionStateResponse> => {
	const response = await axios
		.patch(`/submission/${submissionId}/state`, submissionStateDTO)
		.catch((err) => {
			if (err.response) {
				return err.response;
			}

			return null;
		});

	if (response === null) {
		return {
			type: 'error',
			errors: { server: ['server_down'] }
		};
	}

	if (response.status !== 200) {
		return {
			type: 'error',
			errors: response.data
		};
	}

	return {
		type: 'success'
	};
};

export const fetchUnreviewedSubmissions = async (
	count: number
): Promise<Array<SubmissionResponseDTO>> => {
	return (await axios.get(`/submission/unresolved/${count}`, {})).data.map(
		(submission: { date: string | Date }) => {
			submission.date = new Date(submission.date);
			return submission;
		}
	);
};

export const acceptSubmission = async (submission: SubmissionResponseDTO): Promise<void> => {
	await axios.patch(`/submission/${submission.id}/state`, {
		updated_at: submission.updatedAt,
		state: true
	});
};

export const rejectSubmission = async (
	submission: SubmissionResponseDTO,
	message: string
): Promise<void> => {
	await axios.patch(`/submission/${submission.id}/state`, {
		updated_at: submission.updatedAt,
		state: false,
		message
	});
};
