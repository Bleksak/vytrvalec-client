import {
	acceptSubmission,
	fetchUnreviewedSubmissions,
	rejectSubmission
} from '$actions/Submission';
import type { TinderSubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
import type { SubmissionStateResponse } from '$lib/DTO/SubmissionStateDTO';
import type { AxiosError } from 'axios';

export type UnreviewedSubmissionStore = {
	all: () => Array<TinderSubmissionResponseDTO>;
	pop: () => TinderSubmissionResponseDTO | null;
	accept: (submission: TinderSubmissionResponseDTO, message: string) => Promise<SubmissionStateResponse>;
	reject: (submission: TinderSubmissionResponseDTO, message: string) => Promise<SubmissionStateResponse>;
};

export const createUnreviewedSubmissionStore = (): UnreviewedSubmissionStore => {
	let submissions = $state<Array<TinderSubmissionResponseDTO>>([]);
	let swap = $state<Array<TinderSubmissionResponseDTO>>([]);

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

	const accept = async (submission: TinderSubmissionResponseDTO, message: string): Promise<SubmissionStateResponse> => {
		const result = await acceptSubmission(submission, message).catch((error: AxiosError) => {
			if (error.response) {
				return error.response;
			}

			return null;
		});

		if (result === null) {
			return {
				type: 'error',
				errors: {
					server: ['server_down']
				}
			};
		}

		if (result.status !== 200) {
			return {
				type: 'error',
				errors: result?.data ?? {}
			};
		}

		await refetchIfNeeded();
		swapIfNeeded();

		return {
			type: 'success',
			date: result.data
		};
	};

	const reject = async (submission: TinderSubmissionResponseDTO, message: string): Promise<SubmissionStateResponse> => {
		const result = await rejectSubmission(submission, message).catch((error: AxiosError) => {
			if (error.response) {
				return error.response;
			}

			return null;
		});
		if (result === null) {
			return {
				type: 'error',
				errors: {
					server: ['server_down']
				}
			};
		}

		if (result.status !== 200) {
			return {
				type: 'error',
				errors: result?.data ?? {}
			};
		}

		await refetchIfNeeded();
		swapIfNeeded();

		return {
			type: 'success',
			date: result.data
		};
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
