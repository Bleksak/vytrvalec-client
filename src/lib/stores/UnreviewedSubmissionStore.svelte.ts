import {
	acceptSubmission,
	fetchUnreviewedSubmissions,
	rejectSubmission
} from '$actions/Submission';
import type { SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
import type { AxiosError, AxiosResponse } from 'axios';

export type UnreviewedSubmissionStore = {
	all: () => Array<SubmissionResponseDTO>;
	pop: () => SubmissionResponseDTO | null;
	accept: (submission: SubmissionResponseDTO) => Promise<AxiosResponse | AxiosError>;
	reject: (submission: SubmissionResponseDTO, message: string) => Promise<AxiosResponse | AxiosError>;
};

export const createUnreviewedSubmissionStore = (): UnreviewedSubmissionStore => {
	let submissions = $state<Array<SubmissionResponseDTO>>([]);
	let swap = $state<Array<SubmissionResponseDTO>>([]);

	let initialLoad = true;
	let index = $state(0);
	let ids = $state<Array<number>>([]);

	const count = 25;

	$effect(() => {
		if (initialLoad) {
			initialLoad = false;

			fetchUnreviewedSubmissions(count).then((result) => {
				submissions = result;
				ids = result.map((submission) => submission.id);
			});
		}
	});

	const refetchIfNeeded = async () => {
		if (index % submissions.length === submissions.length - 1) {
			const result = await fetchUnreviewedSubmissions(count + 1);

			if (result.length > 0) {
				swap = result.filter((submission) => !ids.includes(submission.id));
				ids = result.map((submission) => submission.id);
			} else {
				swap = [];
				ids = [];
			}
		}
	};

	const swapIfNeeded = () => {
		if (index % submissions.length === 0 && !initialLoad) {
			submissions = swap;
			index = 0;
		}
	};

	const accept = async (submission: SubmissionResponseDTO): Promise<AxiosResponse | AxiosError> => {
		const result = await acceptSubmission(submission).catch((error: AxiosError) => {
			return error;
		});
		await refetchIfNeeded();
		swapIfNeeded();
		return result;
	};

	const reject = async (submission: SubmissionResponseDTO, message: string): Promise<AxiosResponse | AxiosError> => {
		const result = await rejectSubmission(submission, message).catch((error: AxiosError) => {
			return error;
		});
		await refetchIfNeeded();
		swapIfNeeded();
		return result;
	};

	const all = () => submissions;
	const pop = () => {
		const value = submissions.at(index % count) ?? null;
		index += 1;

		return value;
	};

	return {
		all: all,
		pop: pop,
		accept: accept,
		reject: reject
	};
};

export default createUnreviewedSubmissionStore;
