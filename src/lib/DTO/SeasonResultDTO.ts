import type { UserResponse } from './UserResponse';

export type SeasonResultExtraUser = {
	user: UserResponse;
	faculty: number;
	points: number;
	name: 'weekly_distance' | 'daily_distance' | 'weekly_elevation';
	value: number;
};

export type SeasonResultExtra = {
	user: number;
	faculty: number;
	points: number;
	name: 'weekly_distance' | 'daily_distance' | 'weekly_elevation';
	value: number;
};

export type SeasonResultFaculty = {
	distance: number;
	elevation: number;
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
	totalElevation: number;
	extras: Array<SeasonResultExtraUser>;
};

export class SeasonResult {
	data: SeasonResultDTO;
	cached: SeasonResultCached;
	users: Array<UserResponse>;

	constructor(data: SeasonResultDTO, users: Array<UserResponse>) {
		this.users = users;
		this.data = data;
		this.cached = this.calculateCache();
	}

	calculateCache(): SeasonResultCached {
		let totalDistance = 0;
		let totalElevation = 0;
		let extras = [];

		for (const week of this.data) {
			for (const activity of week.activities) {
				for (const result of activity.results) {
					totalDistance += result.distance;
					totalElevation += result.elevation;
				}

				for (const extra of activity.extras) {
					extras.push(extra);
				}
			}
		}

		console.log(extras);

		const extrasWithUserData: Array<SeasonResultExtraUser> = extras.map(
			(extra): SeasonResultExtraUser => {
				const user: UserResponse = this.users.find((u) => u.id === extra.user)!;

				return {
					faculty: extra.faculty,
					points: extra.points,
					name: extra.name,
					value: extra.value,
					user
				};
			}
		);

		console.log(extrasWithUserData);

		return {
			totalDistance: totalDistance / 1000,
			totalElevation,
			extras: extrasWithUserData
		};
	}

	getTotalDistance(): number {
		return this.cached.totalDistance;
	}

	getTotalElevation(): number {
		return this.cached.totalElevation;
	}

	getExtraPoints(): Array<SeasonResultExtraUser> {
		return this.cached.extras;
	}
}
