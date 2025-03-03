import axios from 'axios';
import type { TotalStatisticsDTO, UserStatisticsDTO } from '$lib/DTO/StatisticsDTO';
import type { ActivityDTO } from '$lib/DTO/ActivityDTO';
import type { SeasonUsersDTO } from '$lib/DTO/SeasonUsersDTO';
import type { Faculty } from '$lib/DTO/Faculty';

export const fetchTotalStatistics = async (): Promise<TotalStatisticsDTO> => {
	const response = await axios.get(`/stats/total`);

	return response.data;
};

export const fetchUserStatistics = async (
	activities: Promise<Array<ActivityDTO>> | Array<ActivityDTO>
): Promise<Array<UserStatisticsDTO>> => {
	const response = (await axios.get(`/stats`).catch(() => null))?.data ?? [];
	const activitiesData = activities instanceof Promise ? await activities : activities;

	return response.map((stat: UserStatisticsDTO) => {
		stat.activity = activitiesData.find(
			(activity: ActivityDTO) => activity.id === stat.activity.id
		)!;

		return stat;
	});
};

export const fetchSeasonUsersStatistics = async (
	seasonId: number
): Promise<Array<SeasonUsersDTO>> => {
	const response = (await axios.get(`/statistics/faculties/${seasonId}`).catch(() => null))?.data ?? [];

	return response;
};