import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
import type { SubmissionCreateResponse } from '$lib/DTO/SubmissionCreateResponse';
import type {
	SubmissionDTO,
	ProfileSubmissionResponseDTO,
	SubmissionResponseAdminDTO,
	TinderSubmissionResponseDTO
} from '$lib/DTO/SubmissionDTO';
import type { SubmissionStateDTO, SubmissionStateResponse } from '$lib/DTO/SubmissionStateDTO';
import axios, { type AxiosResponse } from 'axios';
import type { SelectedFilter } from '$lib/DTO/SelectedFilter';
import type { FacultyDTO } from '$lib/DTO/FacultyDTO';

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

	if (response.status === 413) {
		return {
			type: 'error',
			errors: { image: ['too_large'] },
		}
	} else if (response.status !== 201) {
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
	season: SeasonDTO | { id: number },
	params: SelectedFilter
): Promise<SubmissionResponseAdminDTO[]> => {
	return (
		(await axios.get(`/season/${season.id}/submissions`, { params: params }).catch(() => null))
			?.data ?? []
	).map(
		(submission: {
			date: string | Date;
			user: { faculty: number | FacultyDTO };
			activity: number | ActivityDTO;
		}) => {
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
		type: 'success',
		date: response.data
	};
};

export const fetchUnreviewedSubmissions = async (
	count: number
): Promise<Array<TinderSubmissionResponseDTO>> => {
	return (await axios.get(`/submission/unresolved/${count}`, {})).data.map(
		(submission: { date: string | Date }) => {
			submission.date = new Date(submission.date);
			return submission;
		}
	);
};

export const acceptSubmission = async (
	submission: TinderSubmissionResponseDTO,
	message: string
): Promise<AxiosResponse> => {
	return await axios.patch(`/submission/${submission.id}/state`, {
		updated_at: submission.updatedAt,
		state: true,
		message
	});
};

export const rejectSubmission = async (
	submission: TinderSubmissionResponseDTO,
	message: string
): Promise<AxiosResponse> => {
	return await axios.patch(`/submission/${submission.id}/state`, {
		updated_at: submission.updatedAt,
		state: false,
		message
	});
};

export const patchSubmission = async (dto: SubmissionDTO, data: FormData) => {
	const formData = new FormData();
	const updated_at = data.get('updated_at')!;
	formData.append('activity', dto.activity.toString());
	formData.append('image', dto.image);
	formData.append('distance', dto.distance.toString());

	formData.append('updated_at', updated_at);

	if (dto.elevation) {
		formData.append('elevation', dto.elevation.toString());
	}
	const id = data.get('id');

	//Fking kill me already
	const response = await axios
		.postForm(`/submission/${id}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data', 'X-HTTP-Method-Override': 'PATCH' }
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

	if (response.status === 413) {
		return {
			type: 'error',
			errors: { image: ['too_large'] },
		}
	} else if (response.status !== 201) {
		return {
			type: 'error',
			errors: response.data
		};
	} 

	return {
		type: 'success'
	};
};

export const deleteSubmission = async (submissionId: number): Promise<boolean> => {
	const response = await axios.delete(`/submission/${submissionId}`).catch(() => {
		return null;
	});

	if (response === null) {
		return false;
	}

	if (response.status !== 200) {
		return false;
	}

	return true;
};

export const fetchUserSubmissions = async (
	activities: Promise<Array<ActivityDTO>> | Array<ActivityDTO>
): Promise<ProfileSubmissionResponseDTO[]> => {
	const activitiesData = activities instanceof Promise ? await activities : activities;

	return ((await axios.get(`/submission/user`).catch(() => null))?.data ?? []).map(
		(submission: { date: string | Date; activity: number | ActivityDTO }) => {
			submission.date = new Date(submission.date);
			submission.activity = activitiesData.find(
				(activity: ActivityDTO) => activity.id === submission.activity
			)!;
			return submission;
		}
	);
};
