import type { ActivityDTO } from './ActivityDTO';

export type ActivityStatisticsDTO = {
	activity: ActivityDTO;
	distance: number;
};

export type TotalStatisticsDTO = {
	users: number;
	activities: Array<ActivityStatisticsDTO>;
};

export type UserStatisticsDTO = {
	activity: number;
	distance: number;
	elevation: number;
};
