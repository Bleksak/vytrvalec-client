import type { ActivityDTO } from './ActivityDTO';
import type { Faculty } from './Faculty';
import type { UserResponse } from './UserResponse';

export type SeasonResultExtraUser = {
	user: UserResponse;
	faculty: number;
	points: number;
	name: 'weekly_distance' | 'daily_distance' | 'weekly_elevation';
	value: number;
	activity: ActivityDTO;
};

export type SeasonResultExtra = {
	user: number;
	faculty: number;
	points: number;
	name: 'weekly_distance' | 'daily_distance' | 'weekly_elevation';
	value: number;
};

export type SeasonResultFaculty = {
	faculty: number;
	distance: number;
};

export type SeasonResultActivity = {
	activity: number;
	extras: Array<SeasonResultExtra>;
	results: Array<SeasonResultFaculty>;
};

export type SeasonResultWeek = {
	week: number;
	activities: Array<SeasonResultActivity>;
};

export type SeasonResultDTO = Array<SeasonResultWeek>;

type SeasonResultCached = {
	totalDistance: number;
	extras: Array<SeasonResultExtraUser>;
};

export type ResultRow = {
	faculty: number;
	points: number; // including extra points
	distance: number;
};

export type WeekResultRow = ActivityResultRow & {
	week: number;
};

export type ActivityResultRow = {
	activity: number;
	row: Array<ResultRow>;
};

export class SeasonResult {
	data: SeasonResultDTO;
	cached: SeasonResultCached;
	users: Array<UserResponse>;
	activities: Array<ActivityDTO>;
	faculties: Array<Faculty>;
	results: Array<WeekResultRow>;

	constructor(
		data: SeasonResultDTO,
		users: Array<UserResponse> = [],
		activities: Array<ActivityDTO>,
		faculties: Array<Faculty> = []
	) {
		this.users = users;
		this.faculties = faculties;
		this.activities = activities;
		this.data = data;
		this.cached = this.calculateCache();
		this.results = this.calculateResults();
	}

	calculateResults() {
		if (this.faculties.length === 0) {
			return [];
		}

		let weekResultRows: Array<WeekResultRow> = [];

		for (const week of this.data) {
			for (const activity of week.activities) {
				// 1. create empty object
				let weekResultRow = {
					week: week.week,
					activity: activity.activity,
					row: [] as Array<ResultRow>
				};

				// 2. fill rows with sorted data
				for (const result of activity.results
					.toSorted((a, b) => a.distance - b.distance)
					.map((result, i) => {
						return {
							points: i + 1,
							faculty: result.faculty,
							distance: result.distance
						};
					})) {
					let facultyResult = weekResultRow.row.find((row) => row.faculty === result.faculty);

					if (!facultyResult) {
						weekResultRow.row.push({
							faculty: result.faculty,
							points: result.points,
							distance: result.distance
						});
					} else {
						facultyResult.points += result.points;
						facultyResult.distance += result.distance;
					}
				}

				// TODO: check all faculties, if their points for a week is 0,
				// then check if they had any points in the previous week, if yes, give them at least 1 point

				// 3. add extra points
				for (const extras of activity.extras) {
					let facultyResult = weekResultRow.row.find((row) => row.faculty === extras.faculty);
					facultyResult!.points += extras.points;
				}

				// 4. sort again
				weekResultRow.row.sort((a, b) => b.points - a.points);

				weekResultRows.push(weekResultRow);
			}
		}

		return weekResultRows;
	}

	calculateCache(): SeasonResultCached {
		let totalDistance = 0;
		let extras = [];

		for (const week of this.data) {
			for (const activity of week.activities) {
				for (const result of activity.results) {
					totalDistance += result.distance;
				}

				for (const extra of activity.extras) {
					extras.push({ ...extra, activity: activity.activity });
				}
			}
		}

		const extrasWithUserData: Array<SeasonResultExtraUser> = extras.map(
			(extra): SeasonResultExtraUser => {
				const user: UserResponse = this.users.find((u) => u.id === extra.user)!;
				const activity = this.activities.find((a) => a.id === extra.activity)!;

				return {
					faculty: extra.faculty,
					points: extra.points,
					name: extra.name,
					value: extra.value,
					activity,
					user
				};
			}
		);

		return {
			totalDistance: totalDistance / 1000,
			extras: extrasWithUserData
		};
	}

	getTotalDistance(): number {
		return this.cached.totalDistance;
	}

	getExtraPoints(): Array<SeasonResultExtraUser> {
		return this.cached.extras;
	}

	getTotalWinners(): Array<ResultRow> {
		let winners: Array<ResultRow> = [];

		for (const week of this.results) {
			for (const row of week.row) {
				let winner = winners.find((w) => w.faculty === row.faculty);
				if (!winner) {
					winners.push(row);
				} else {
					winner.points += row.points;
					winner.distance += row.distance;
				}
			}
		}

		return winners;
	}

	getResults(): Array<WeekResultRow> {
		return this.results;
	}

	getResultsForWeek(week: number): Array<ActivityResultRow> {
		if (week !== 0) {
			return this.results
				.filter((w) => w.week === week - 1)
				.toSorted((a, b) => a.activity - b.activity);
		}

		let results: Array<ActivityResultRow> = [];

		for (const week of this.results) {
			const workingActivity = results.find((w) => w.activity === week.activity);
			if (!workingActivity) {
				results.push({
					activity: week.activity,
					row: JSON.parse(JSON.stringify(week.row))
				});
			} else {
				for (const row of week.row) {
					let workingRow = workingActivity.row.find((w) => w.faculty === row.faculty);
					if (!workingRow) {
						workingActivity.row.push(row);
					} else {
						workingRow.points += row.points;
						workingRow.distance += row.distance;
					}
				}
			}
		}

		for (const result of results) {
			result.row.sort((a, b) => b.points - a.points);
		}

		results.sort((a, b) => a.activity - b.activity);

		return results;
	}
}
