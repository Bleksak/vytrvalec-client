import { deleteFaculty, fetchFaculties } from "$actions/Faculty";
import type { FacultyDTO } from "$lib/DTO/FacultyDTO";

export type FacultyStore = {
    all: () => FacultyDTO[];
    get: (id: number) => FacultyDTO | null;
    updateOrCreate: (faculty: FacultyDTO) => void;
    remove: (faculty: FacultyDTO) => Promise<boolean>;
    promise: () => Promise<FacultyDTO[]>;
}

const createFacultyStore = (): FacultyStore => {
    let faculties = $state<FacultyDTO[]>([]);
    let facultiesPromise = fetchFaculties();

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

    const updateOrCreate = async (facultyId: number) => {
        facultiesPromise = fetchFaculties();
        faculties = await facultiesPromise;

        let index = faculties.findIndex((f) => f.id === facultyId);
        const faculty = faculties.find((f) => f.id === facultyId)!;

        if (index !== -1) {
            faculties[index] = faculty;
        } else {
            faculties.unshift(faculty);
        }
    };

    const remove = async (faculty: FacultyDTO): Promise<boolean> => {
        const result = await deleteFaculty(faculty.id);

        if (result) {
            faculties = faculties.filter((f) => f.id !== faculty.id);
        }

        return result.type !== "error";
    };

    const promise = (): Promise<FacultyDTO[]> => {
        return facultiesPromise;
    }

    return {
        all: all,
        get: get,
        promise: promise,
        updateOrCreate: updateOrCreate,
		remove: remove
    }
 }

export default createFacultyStore;