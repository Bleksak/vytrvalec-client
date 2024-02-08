import { getUserSubmissions } from "$actions/User";
import type { UnknownSubmissionResponse } from "$lib/DTO/SubmissionDTO"

export type UserSubmissionsStore = {
    all: () => UnknownSubmissionResponse[];
    refetch: () => void;
    promise: () => Promise<UnknownSubmissionResponse[]>
}

export const createUserSubmissionStore = (): UserSubmissionsStore => {
    let userSubmissions = $state<UnknownSubmissionResponse[]>([]);
    let userSubmissionsPromise: Promise<UnknownSubmissionResponse[]> = getUserSubmissions();

    userSubmissionsPromise.then(result => {
        userSubmissions = result;
    });

    const all = () => {
        return userSubmissions;
    }
    const refetch = () => {
        getUserSubmissions().then(result => userSubmissions = result);
    }

    return {
        all: all,
        refetch: refetch,
        promise: () => userSubmissionsPromise
    }
}

export default createUserSubmissionStore;
