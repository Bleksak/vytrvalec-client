import { fetchSeasons } from '$actions/Season';
import { type SeasonDTO } from '$lib/DTO/SeasonDTO';

export type SeasonStore = {
	get: (id: number) => SeasonDTO | null;
	promise: () => Promise<Array<SeasonDTO>>;
	all: () => Array<SeasonDTO>;
	updateOrCreate: (season: SeasonDTO) => void;
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

	const updateOrCreate = (season: SeasonDTO) => {
		let index = seasons.findIndex((c) => c.id === season.id);

		if (index !== -1) {
			seasons[index] = season;
		} else {
			seasons.push(season);
		}
	};

	const promise = () => seasonsPromise;

	return {
		get: get,
		promise: promise,
		all: all,
		updateOrCreate: updateOrCreate
	};
};

export default createSeasonStore;
