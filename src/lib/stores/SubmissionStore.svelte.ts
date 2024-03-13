import { fetchSubmissionsForSeason } from '$actions/Submission';
import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
import type { SubmissionResponseAdminDTO, SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';

export type SubmissionFilter = {
	reviewed?: boolean;
	accepted?: boolean;
	activity?: number;
};

export type SubmissionStore = {
	get: (id: number) => SubmissionResponseAdminDTO | null;
	all: () => Array<SubmissionResponseAdminDTO>;
	loadNextPage: () => void;
	update: (submission: SubmissionResponseAdminDTO) => void;
	filter: (filtering: SubmissionFilter) => Array<SubmissionResponseAdminDTO>;
	promise: () => Promise<Array<SubmissionResponseAdminDTO>>;
};

export const createSubmissionStore = (season: SeasonDTO): SubmissionStore => {
	let submissions = $state<Array<SubmissionResponseAdminDTO>>([]);

	let currentPage = 1;
	let submissionsPromise: Promise<Array<SubmissionResponseAdminDTO>> = fetchSubmissionsForSeason(season, currentPage);

	let canLoadMore = true;

	submissionsPromise.then((result) => {
		submissions = result;
	});

	const filter = (filtering: SubmissionFilter): Array<SubmissionResponseAdminDTO> => {
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

	const get = (id: number): SubmissionResponseAdminDTO | null => {
		if (Number.isNaN(id)) {
			return null;
		}

		return submissions.find((submission) => submission.id === id) ?? null;
	};

	const all = (): Array<SubmissionResponseAdminDTO> => {
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

	const update = (submission: SubmissionResponseAdminDTO) => {
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
