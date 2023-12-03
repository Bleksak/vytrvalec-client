export type ActivityStatisticsDTO = {
    activity: string,
    distance: number,
};

export type TotalStatisticsDTO = {
    users: number,
    activities: Array<ActivityStatisticsDTO>
};
