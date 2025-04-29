import type { ActivityDTO } from './ActivityDTO';
import type { AnonymizedUser } from './UserResponse';

export type SeasonResultExtraActivity = {
	user: AnonymizedUser;
	faculty: number;
	points: number;
	name: 'weekly_distance' | 'daily_distance' | 'weekly_elevation';
	value: number;
	activity: ActivityDTO;
};

export type SeasonResultExtra = {
	user: AnonymizedUser;
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

export type OutlierActivity = {
	activity_id: number;
	results: Array<{
		user: AnonymizedUser;
		faculty_id: number;
		value: number;
	}>;
};

export type SeasonResultDTO = {
	results: Array<SeasonResultWeek>;
	outliers: Array<OutlierActivity>;
};

type SeasonResultCached = {
	totalDistance: number;
	extras: Array<SeasonResultExtraActivity>;
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
	extra: Array<SeasonResultExtra>;
};

function sortFn(a: ResultRow, b: ResultRow) {
	const pointsResult = b.points - a.points;
	if (pointsResult !== 0) {
		return pointsResult;
	}

	return b.distance - a.distance;
}

export class SeasonResult {
	data: SeasonResultDTO;
	cached: SeasonResultCached;
	activities: Array<ActivityDTO>;
	results: Array<WeekResultRow>;

	constructor(data: SeasonResultDTO, activities: Array<ActivityDTO>) {
		this.activities = activities;
		this.data = data;
		this.cached = this.calculateCache();
		this.results = this.calculateResults();
	}

	calculateResults() {
		let weekResultRows: Array<WeekResultRow> = [];

		// find all faculties that have any results
		let faculties: Array<number> = [];

		for (const week of this.data.results) {
			for (const activity of week.activities) {
				for (const result of activity.results) {
					if (!faculties.includes(result.faculty)) {
						faculties.push(result.faculty);
					}
				}
			}
		}

		for (const week of this.data.results) {
			for (const activity of week.activities) {
				// 1. create empty object
				let weekResultRow = {
					week: week.week,
					activity: activity.activity,
					row: [] as Array<ResultRow>,
					extra: [] as Array<SeasonResultExtra>
				};

				for (const faculty of faculties) {
					weekResultRow.row.push({
						faculty,
						points: 0,
						distance: 0
					});
				}

				// 2. fill rows with sorted data
				for (const result of activity.results
					.toSorted((a, b) => b.distance - a.distance)
					.map((result, i) => {
						return {
							points: faculties.length - i,
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

				// 3. add extra points
				for (const extras of activity.extras) {
					let facultyResult = weekResultRow.row.find((row) => row.faculty === extras.faculty);
					facultyResult!.points += extras.points;
				}

				// 4. sort again
				weekResultRow.row.sort(sortFn);
				weekResultRow.extra = activity.extras;
				weekResultRows.push(weekResultRow);
			}
		}

		return weekResultRows;
	}

	calculateCache(): SeasonResultCached {
		let totalDistance = 0;
		let extras = [];

		for (const week of this.data.results) {
			for (const activity of week.activities) {
				for (const result of activity.results) {
					totalDistance += result.distance;
				}

				for (const extra of activity.extras) {
					extras.push({ ...extra, activity: activity.activity });
				}
			}
		}

		const extrasWithActivity: Array<SeasonResultExtraActivity> = extras.map(
			(extra): SeasonResultExtraActivity => {
				const activity = this.activities.find((a) => a.id === extra.activity)!;

				return {
					faculty: extra.faculty,
					points: extra.points,
					name: extra.name,
					value: extra.value,
					user: extra.user,
					activity
				};
			}
		);

		return {
			totalDistance: totalDistance / 1000,
			extras: extrasWithActivity
		};
	}

	getTotalDistance(): number {
		return this.cached.totalDistance;
	}

	getExtraPoints(): Array<SeasonResultExtraActivity> {
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

		winners.sort(sortFn);

		return winners;
	}

	getResults(): Array<WeekResultRow> {
		return this.results;
	}

	addTotal(weekData: Array<ActivityResultRow>): Array<ActivityResultRow> {
		if (weekData.length === 0) {
			return weekData;
		}

		let total: ActivityResultRow = { activity: -1, row: [], extra: [] };

		for (const activityRow of weekData) {
			for (const row of activityRow.row) {
				let workingRow = total.row.find((w) => w.faculty === row.faculty);

				if (!workingRow) {
					total.row.push({ ...row });
				} else {
					workingRow.points += row.points;
					workingRow.distance += row.distance;
				}
			}
		}

		total.row.sort(sortFn);

		weekData.push(total);
		return weekData;
	}

	getResultsForWeek(week: number): Array<ActivityResultRow> {
		if (week !== 0) {
			return this.addTotal(
				this.results.filter((w) => w.week === week - 1).toSorted((a, b) => a.activity - b.activity)
			);
		}

		let results: Array<ActivityResultRow> = [];

		for (const week of this.results) {
			const workingActivity = results.find((w) => w.activity === week.activity);
			if (!workingActivity) {
				results.push({
					activity: week.activity,
					row: JSON.parse(JSON.stringify(week.row)),
					extra: week.extra
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
			result.row.sort(sortFn);
		}

		results.sort((a, b) => a.activity - b.activity);

		return this.addTotal(results);
	}
}
