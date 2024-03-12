import { fetchSubmissionsForSeason } from '$actions/Submission';
import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
import type { SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';

export type SubmissionFilter = {
	reviewed?: boolean;
	accepted?: boolean;
	activity?: number;
};

export type SubmissionStore = {
	get: (id: number) => SubmissionResponseDTO | null;
	all: () => Array<SubmissionResponseDTO>;
	loadNextPage: () => void;
	update: (submission: SubmissionResponseDTO) => void;
	filter: (filtering: SubmissionFilter) => Array<SubmissionResponseDTO>;
	promise: () => Promise<Array<SubmissionResponseDTO>>;
};

export const createSubmissionStore = (season: SeasonDTO): SubmissionStore => {
	let submissions = $state<Array<SubmissionResponseDTO>>([]);

	let currentPage = 1;
	let submissionsPromise: Promise<Array<SubmissionResponseDTO>> = fetchSubmissionsForSeason(season, currentPage);

	let canLoadMore = true;

	submissionsPromise.then((result) => {
		submissions = result;
	});

	const filter = (filtering: SubmissionFilter): Array<SubmissionResponseDTO> => {
		return submissions.filter((submission) => {
			if (filtering.activity !== undefined && submission.activity !== undefined) {
				return false;
			}

			if (filtering.reviewed !== undefined && submission.reviewed !== undefined) {
				return false;
			}

			if (filtering.accepted !== undefined && submission.accepted !== undefined) {
				return false;
			}

			return true;
		});
	};

	const get = (id: number): SubmissionResponseDTO | null => {
		if (Number.isNaN(id)) {
			return null;
		}

		return submissions.find((submission) => submission.id === id) ?? null;
	};

	const all = (): Array<SubmissionResponseDTO> => {
		return submissions;
	};

	const loadNextPage = () => {
		if (!canLoadMore) return;

		currentPage++;
		fetchSubmissionsForSeason(season, currentPage).then(nextSubmissions => {
			submissions = [...submissions, ...nextSubmissions];
			if (nextSubmissions.length === 0) {
				canLoadMore = false;
			}
		})
	}

	const update = (submission: SubmissionResponseDTO) => {
		let index = submissions.findIndex((s) => s.id === submission.id);

		if (index !== -1) {
			submissions[index] = submission;
		}
	};

	return {
		get: get,
		all: all,
		loadNextPage: loadNextPage,
		update: update,
		filter: filter,
		promise: () => submissionsPromise
	};
};

export default createSubmissionStore;
