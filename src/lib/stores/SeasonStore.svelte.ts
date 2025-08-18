import { deleteSeason, fetchSeasons } from '$actions/Season';
import { type SeasonDTO } from '$lib/DTO/SeasonDTO';

export type SeasonStore = {
	get: (id: number) => SeasonDTO | null;
	promise: () => Promise<Array<SeasonDTO>>;
	all: () => Array<SeasonDTO>;
	updateOrCreate: (season: SeasonDTO) => void;
	remove: (season: SeasonDTO) => Promise<boolean>;
	currentOrLast: () => SeasonDTO | null;
};

export const createSeasonStore = (): SeasonStore => {
	let seasons = $state<Array<SeasonDTO>>([]);
	const seasonsPromise = fetchSeasons();

	seasonsPromise.then((result) => {
		seasons = result;
	});

	const get = (id: number): SeasonDTO | null => {
		if (Number.isNaN(id)) {
			return null;
		}

		return seasons.find((season) => season.id === id) ?? null;
	};

	const all = (): Array<SeasonDTO> => {
		return seasons;
	};

	const remove = async (season: SeasonDTO): Promise<boolean> => {
		const result = await deleteSeason(season);

		if (result) {
			seasons = seasons.filter((s) => s.id !== season.id);
		}

		return result;
	};

	const updateOrCreate = (season: SeasonDTO) => {
		let index = seasons.findIndex((c) => c.id === season.id);

		if (index !== -1) {
			seasons[index] = season;
		} else {
			seasons.unshift(season);
		}
	};

	const currentOrLast = (): SeasonDTO | null => {
		return seasons.at(0) ?? null;
	};

	const promise = () => seasonsPromise;

	return {
		get: get,
		promise: promise,
		all: all,
		updateOrCreate: updateOrCreate,
		remove: remove,
		currentOrLast: currentOrLast
	};
};

export default createSeasonStore;
