import type { ResponseErrorMap } from '$lib/ResponseErrors';
import type { ActivityDTO } from './ActivityDTO';
import type { UserResponse } from './UserResponse';

export type SubmissionDTO = {
	distance: number;
	elevation?: number;
	image: File;
	activity: number;
};

export type SubmissionResponseDTO = {
	id: number;
	distance: number;
	elevation?: number;
	image: string;
	activity: ActivityDTO;
	accepted: boolean;
	reviewed: boolean;
	user: UserResponse;
	date: Date;
	updatedAt: string;
};


export type UnknownSubmissionResponse = {
	message?: string,
	s_id: number,
	activity_id: number,
	week: number,
	distance: number,
	elevation: number,
	accepted: number,
	reviewed: number,
	date: string,
	image: string,
	updated_at: string,
}

export type SubmissionErrors = ResponseErrorMap<SubmissionDTO>;

export type SubmissionReturn =
	| {
		type: 'dto';
		value: SubmissionDTO;
	}
	| {
		type: 'error';
		value: SubmissionErrors;
	};

export const formDataToSubmissionDTO = (formData: FormData): SubmissionReturn => {
	const distanceString = formData.get('distance')?.toString();
	const distance = Number(distanceString);

	const elevationString = formData.get('elevation')?.toString();
	const elevation = Number(elevationString);

	const activity = Number(formData.get('activity')?.toString());

	const image: File = formData.get('image')?.valueOf() as File;

	let valid = true;
	let errors: SubmissionErrors = {
		distance: [],
		elevation: [],
		activity: [],
		image: []
	};

	if (distanceString === undefined || distanceString === '' || distanceString === null) {
		valid = false;
		errors.distance?.push('blank');
	}

	if (distance === Number.NaN || !Number.isInteger(distance)) {
		valid = false;
		errors.distance?.push('invalid');
	}

	if (Number.isInteger(distance) && distance < 1) {
		valid = false;
		errors.distance?.push('negative');
	}

	if (elevationString !== undefined && elevationString !== '' && elevationString !== null) {
		if (elevation === Number.NaN || !Number.isInteger(elevation)) {
			valid = false;
			errors.elevation?.push('invalid');
		}

		if (distance < 0) {
			valid = false;
			errors.elevation?.push('negative');
		}
	}

	if (activity === undefined || activity === null) {
		valid = false;
		errors.activity?.push('invalid');
	}

	if (
		image === undefined ||
		image === null ||
		image.name === undefined ||
		image.size === undefined ||
		image.type === undefined
	) {
		valid = false;
		errors.image?.push('invalid');
	}

	if (!valid) {
		return {
			type: 'error',
			value: errors
		};
	}

	return {
		type: 'dto',
		value: {
			elevation: elevation,
			distance: distance!,
			activity: activity!,
			image: image!
		}
	};
};
