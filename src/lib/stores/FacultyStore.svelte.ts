import { fetchFaculties } from "$actions/Faculty";
import type { FacultyDTO } from "$lib/DTO/FacultyDTO";

export type FacultyStore = {
    all: () => FacultyDTO[];
    get: (id: number) => FacultyDTO | null;
    updateOrCreate: (faculty: FacultyDTO) => void;
    promise: () => Promise<FacultyDTO[]>;
}

const createFacultyStore = (): FacultyStore => {
    let faculties = $state<FacultyDTO[]>([]);
    const facultiesPromise = fetchFaculties();

    facultiesPromise.then((result: FacultyDTO[]) => {
        faculties = result;
    })

    const all = (): FacultyDTO[] => {
        return faculties;
    }

    const get = (id: number): FacultyDTO | null => {
        if (Number.isNaN(id)) {
            return null;
        }

        return faculties.find((faculty: FacultyDTO) => faculty.id === id) ?? null;
    }

    const updateOrCreate = async (faculty: FacultyDTO) => {
        const index = faculties.findIndex((f) => f.id === faculty.id);

        if (index !== -1) {
            faculties[index] = faculty;
        } else {
            faculties.unshift(faculty);
        }
    };

    const promise = (): Promise<FacultyDTO[]> => {
        return facultiesPromise;
    }

    return {
        all: all,
        get: get,
        promise: promise,
        updateOrCreate: updateOrCreate,
    }
 }

export default createFacultyStore;