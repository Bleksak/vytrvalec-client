import { getUserSubmissions } from "$actions/User";
import type { ActivityDTO } from "$lib/DTO/ActivityDTO";
import type { UnknownSubmissionResponse } from "$lib/DTO/SubmissionDTO"
import activityStore from "./ActivityStore.svelte";

type ProfileData = {
    submissions: TransformedSubmission[];
    statistics: ProfileStatistics[]
}

export type ProfileDataStore = {
    all: () => ProfileData;
    refetch: () => void;
    promise: () => Promise<ProfileData>
}

export const createProfileDataStore = (): ProfileDataStore => {
    let profileData = $state<ProfileData>({ submissions: [], statistics: [] });
    let profileDataPromise: Promise<ProfileData> = createProfileData()
        .catch(e => {
            return profileData;
        });

    profileDataPromise.then((data: ProfileData) => {
        profileData = data
    });

    const all = () => {
        return profileData;
    }

    const refetch = () => {
        createProfileData().then((data: ProfileData) => {
            profileData = data
        });
    }

    return {
        all: all,
        refetch: refetch,
        promise: () => profileDataPromise
    }
}

export type ProfileStatistics = {
    activity: ActivityDTO;
    distance: number,
    elevation: number
}

const createProfileData = async (): Promise<ProfileData> => {
    const [submissions, activities] = await Promise.all([getUserSubmissions(), activityStore.promise()]);
    const transformedSubmissions: TransformedSubmission[] = submissions.map((sub: UnknownSubmissionResponse) => {
        return {
            activity: activities.find((activity: ActivityDTO) => sub.activity_id === activity.id)!,
            ...sub,
        }
    });

    return {
        submissions: transformedSubmissions,
        statistics: getStatisticsArray(transformedSubmissions)
    }
}

export type TransformedSubmission = {
    activity: ActivityDTO;
} & Omit<UnknownSubmissionResponse, 'activity_id'>

const getStatisticsArray = (submissions: TransformedSubmission[]): ProfileStatistics[] => {
    const statistics: ProfileStatistics[] = [];
    submissions.forEach((submission: TransformedSubmission) => {
        if (!submission.accepted) return;

        const index = statistics.findIndex((stat: ProfileStatistics) => stat.activity.id === submission.activity.id);
        if (index == -1) {
            statistics.push({
                activity: submission.activity,
                distance: submission.distance,
                elevation: submission.elevation
            })
        } else {
            statistics[index].distance += submission.distance;
            statistics[index].elevation += submission.elevation;
        }
    });

    return statistics;

}

const profileDataStore = createProfileDataStore();

export default profileDataStore;
