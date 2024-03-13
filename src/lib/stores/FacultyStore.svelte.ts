import { fetchFaculties } from "$actions/Faculty";
import type { Faculty } from "$lib/DTO/Faculty"

export type FacultyStore = {
    all: () => Faculty[];
    get: (id: number) => Faculty | null;
    promise: () => Promise<Faculty[]>;
}
const createFacultyStore = (): FacultyStore => {
    let faculties = $state<Faculty[]>([]);
    const facultiesPromise = fetchFaculties();

    facultiesPromise.then((result: Faculty[]) => {
        faculties = result;
    })

    const all = (): Faculty[] => {
        return faculties;
    }

    const get = (id: number): Faculty | null => {
        if (Number.isNaN(id)) {
            return null;
        }

        return faculties.find((faculty: Faculty) => faculty.id === id) ?? null;
    }

    const promise = (): Promise<Faculty[]> => {
        return facultiesPromise;
    }

    return {
        all: all,
        get: get,
        promise: promise
    }
 }

export default createFacultyStore;