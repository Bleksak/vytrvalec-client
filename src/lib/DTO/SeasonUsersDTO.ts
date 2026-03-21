export type SeasonUsersDTO = {
    faculty: number;
    count: number;
};

export type SeasonUsersStatisticsDTO = {
    users: Array<SeasonUsersDTO>;
    total: number;
};
