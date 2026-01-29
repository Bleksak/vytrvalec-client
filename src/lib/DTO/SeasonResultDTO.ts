import type { SvelteMap } from 'svelte/reactivity';
import type { ActivityDTO } from './ActivityDTO';
import type { SeasonDTO } from './SeasonDTO';
import type { AnonymizedUser } from './UserResponse';

export type SeasonResultData = {
    results: Record<number, WeeklyResult>;
    outliers: Record<number, OutlierActivity>;
    users: Record<number, AnonymizedUser>;
}

type WeeklyResult = {
    week: number;
    activities: Record<number, ActivityResult>;
}

type ActivityResult = {
    extras: Array<ExtraPoints>;
    results: Record<number, FacultyResult>;
}

type FacultyResult = {
    faculty: number;
    distance: number;
}

export type ExtraPoints = {
    user: number;
    faculty: number;
    name: 'weekly_distance' | 'daily_distance' | 'weekly_elevation';
    value: number;
    points: number;
    activity: number;
}

export type OutlierActivity = {
    activity_id: number;
    results: Record<number, OutlierResult>;
}

type OutlierResult = {
    user: number,
    faculty_id: number,
    value: number,
}

export type SeasonResultRank = {
    total_distance: number;
    total_points: number;
    rows: Array<SeasonResultRankRow>;
    extras: Array<ExtraPoints>;
}

export type SeasonResultRankRow = {
    faculty: number;
    distance: number;
    points: number;
}

function createFacultySet(results: SeasonResultData): Set<number> {
    let faculties: Set<number> = new Set<number>();

    for (const week of Object.values(results.results)) {
        for (const activity of Object.values(week.activities)) {
            for (const result of Object.values(activity.results)) {
                faculties.add(result.faculty);
            }
        }
    }

    return faculties;
}

function getWeekCount(season: SeasonDTO): number {
    const diff_ms = season.end.getTime() - season.start.getTime();
    const diff_days = Math.floor(diff_ms / (1000 * 60 * 60 * 24));
    const weeks = Math.floor((diff_days + 1) / 7);

    return weeks === 0 ? 1 : weeks;
}

export class SeasonResult {
    activities: SvelteMap<number, ActivityDTO>;

    constructor(activities: SvelteMap<number, ActivityDTO>) {
        this.activities = activities;
    }

    calculateSeasonResultRank(season: SeasonDTO, data: SeasonResultData, week: null | number = null, activity: null | number = null): SeasonResultRank {
        // za kazdy tyden se udeluje stejny pocet bodu(N)
        // tzn pokud se v prvnim tydnu zucastni 7 fakult a ve druhem tydnu 12 fakult, rozdeluje se i za prvni tyden 12 bodu
        // QUESTION(@bleksak): Je tohle opravdu co oni chteji? Kdyz to delali rucne, tak to spocitali za 1. tyden 7 fakult => 7 bodu, 2 tyden 12 bodu, ale nepamatuju si to uz

        /**
         * @technical:
         * 1.1. Vytvorit set unikatnich fakult skrz celou sezonu => pocet fakult v setu === pocet bodu za 1 tyden
         * 1.2. v kazdem tydnu -> seradit od nejvetsiho po nejmensi a rozdelovat N-i bodu => i je pozice fakulty
         * 1.3. pridat extra body
         * 1.4. pokud chceme vysledky za 1 tyden -> 1.x hotovo, jinak:
         * 1.5. clash tydnu
         * 2.1. pokud chceme vysledky za vsechny aktivity dohromady => 2.x hotovo, jinak:
         * 2.2. clash aktivit
         * 3. jeste jednou seradit kvuli tomu ze 2 fakutly muzou mit stejny pocet bodu => radime je potom podle (body, distance)
         */

        const facultySet = createFacultySet(data);

        let ranking: Record<number, SeasonResultRankRow> = {};
        let extras: Array<ExtraPoints> = [];

        if (week === null) {
            for (const [_, weeklyResult] of Object.entries(data.results)) {
                this.populateRankingArray(facultySet, weeklyResult, ranking, extras, activity);
            }
        } else {
            if (week < 0 || week > getWeekCount(season)) {
                return {
                    total_distance: 0,
                    total_points: 0,
                    rows: [],
                    extras: [],
                }
            }

            const weeklyResult = data.results[week];
            this.populateRankingArray(facultySet, weeklyResult, ranking, extras, activity);
        }

        let result = [];
        let totalDistance = 0;
        let totalPoints = 0;

        for (const row of Object.values(ranking)) {
            result.push({
                faculty: row.faculty,
                distance: row.distance,
                points: row.points,
            });

            totalDistance += row.distance;
            totalPoints += row.points;
        }

        result.sort((a, b) => {
            const pointsResult = b.points - a.points;
            if (pointsResult !== 0) {
                return pointsResult;
            }

            return b.distance - a.distance;
        });

        return {
            total_distance: totalDistance,
            total_points: totalPoints,
            rows: result,
            extras: extras,
        };
    }

    populateRankingArray(
        facultySet: Set<number>,
        weeklyResult: WeeklyResult,
        ranking: Record<number, SeasonResultRankRow>,
        extras: Array<ExtraPoints>,
        allowedActivity: number | null = null
    ): void {
        for (const [activityIdStr, activityResult] of Object.entries(weeklyResult.activities)) {
            const activityId = Number(activityIdStr);

            if (allowedActivity !== null && activityId !== allowedActivity) {
                continue;
            }

            let facultyResults = [...Object.values(activityResult.results)];
            facultyResults.sort((a, b) => b.distance - a.distance);

            for (let i = 0; i < facultyResults.length; i++) {
                const facultyResult = facultyResults[i];
                const facultyId = facultyResult.faculty;

                const points = facultySet.size - i;

                if (ranking[facultyId] === undefined) {
                    ranking[facultyId] = {
                        distance: 0,
                        points: 0,
                        faculty: facultyId,
                    };
                }

                ranking[facultyId].distance += facultyResult.distance;
                ranking[facultyId].points += points;
            }

            for (const extra of activityResult.extras) {
                ranking[extra.faculty].points += extra.points;
                extras.push(extra);
            }
        }
    }
}
