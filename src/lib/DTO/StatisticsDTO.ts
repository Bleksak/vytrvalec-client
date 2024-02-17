import type { ActivityDTO } from "./ActivityDTO";

export type ActivityStatisticsDTO = {
    activity: string,
    distance: number,
};

export type TotalStatisticsDTO = {
    users: number,
    activities: Array<ActivityStatisticsDTO>
};

export type UserStatisticsDTO = {
    activity: ActivityDTO;
    distance: number;
    elevation: number;
}
