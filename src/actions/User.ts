import type { UnknownSubmissionResponse } from "$lib/DTO/SubmissionDTO";
import axios from "axios";

export const getUserSubmissions = async (): Promise<UnknownSubmissionResponse[]> => {
    return (await axios.get(`/submission/user`)).data;
}