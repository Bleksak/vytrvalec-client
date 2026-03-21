import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
import type { SubmissionCreateResponse } from '$lib/DTO/SubmissionCreateResponse';
import type {
    SubmissionDTO,
    SubmissionResponseAdminDTO,
    SubmissionResponseDTO,
} from '$lib/DTO/SubmissionDTO';
import type { SubmissionStateDTO, SubmissionStateResponse } from '$lib/DTO/SubmissionStateDTO';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type { SelectedFilter } from '$lib/DTO/SelectedFilter';
import type { FacultyDTO } from '$lib/DTO/FacultyDTO';

export const createSubmission = async (
    api: AxiosInstance,
    dto: SubmissionDTO,
): Promise<SubmissionCreateResponse> => {
    const response = await api.post(`/submission`, dto).catch((error) => {
        if (error.response) {
            return error.response;
        }

        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: { server: ['server_down'] },
        };
    }

    if (response.status !== 201) {
        return {
            type: 'error',
            errors: response.data,
        };
    }

    return {
        type: 'success',
    };
};

export const fetchSubmissionsForSeason = async (
    api: AxiosInstance = axios,
    season: SeasonDTO | { id: number },
    params: SelectedFilter,
): Promise<SubmissionResponseAdminDTO[]> => {
    return (
        (await api.get(`/season/${season.id}/submissions`, { params: params }).catch(() => null))
            ?.data ?? []
    ).map(
        (submission: {
            date: string | Date;
            user: { faculty: number | FacultyDTO };
            activity: number | ActivityDTO;
        }) => {
            submission.date = new Date(submission.date);
            return submission;
        },
    );
};

export const setSubmissionState = async (
    api: AxiosInstance,
    submissionId: number,
    submissionStateDTO: SubmissionStateDTO,
): Promise<SubmissionStateResponse> => {
    const response = await api
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
            errors: { server: ['server_down'] },
        };
    }

    if (response.status !== 200) {
        return {
            type: 'error',
            errors: response.data,
        };
    }

    return {
        type: 'success',
        date: response.data,
    };
};

export const acceptSubmission = async (
    submission: SubmissionResponseDTO,
    message: string,
    api: AxiosInstance,
): Promise<AxiosResponse> => {
    return await api.patch(`/submission/${submission.id}/state`, {
        updated_at: submission.updated_at,
        state: true,
        message,
    });
};

export const rejectSubmission = async (
    submission: SubmissionResponseDTO,
    message: string,
    api: AxiosInstance,
): Promise<AxiosResponse> => {
    return await api.patch(`/submission/${submission.id}/state`, {
        updated_at: submission.updated_at,
        state: false,
        message,
    });
};

export const patchSubmission = async (api: AxiosInstance, dto: SubmissionDTO, data: FormData) => {
    const id = data.get('id');

    const response = await api.patch(`/submission/${id}`, dto).catch((error) => {
        if (error.response) {
            return error.response;
        }
        return null;
    });

    if (response === null) {
        return {
            type: 'error',
            errors: { server: ['server_down'] },
        };
    }

    if (response.status === 413) {
        return {
            type: 'error',
            errors: { image: ['too_large'] },
        };
    } else if (response.status !== 201) {
        return {
            type: 'error',
            errors: response.data,
        };
    }

    return {
        type: 'success',
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
    api: AxiosInstance,
): Promise<SubmissionResponseDTO[]> => {
    const response = await api
        .get<Record<number, SubmissionResponseDTO>>(`/submission/user`)
        .catch(() => null);

    if (response === null) {
        return [];
    }

    return Object.values(response.data).map((submission: SubmissionResponseDTO) => {
        return {
            ...submission,
            date: new Date(submission.date),
        };
    });
};
