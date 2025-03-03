import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';

export type FacultyDTO = {
    id: number;
    name: string;
    shortcut: string;
    visible: number;
    parent: number;
};

export type FacultyCreateDTO = Omit<FacultyDTO, 'id'>;

export type FacultyCreateData = {
    id: number;
};

export type FacultyError = ResponseErrorMap<FacultyDTO> & {
    auth?: Array<ResponseError>;
};

export type FacultyCreateReturn =
    | {
            type: 'dto';
            data: FacultyCreateDTO;
      }
    | {
            type: 'error';
            errors: FacultyError;
    };  

export type FacultyCreateResponse =
    | {
        type: 'success';
        data: FacultyDTO
    }
    | {
        type: 'error';
        errors: FacultyError;
    };


export type FacultyEditResponse =
    | {
            type: 'success';
      }
    | {
            type: 'error';
            errors: FacultyError;
    };
      

export const createFacultyDTO = (formData: FormData): FacultyCreateReturn => {
    const name = formData.get('name') as string;
    const shortcut = formData.get('shortcut') as string;
    const visible = formData.get('visible') as unknown as number;
    const parent = formData.get('parent') as unknown as number;


    let errors: FacultyError = {}

    if (!name || name === '') {
        errors['name'] = ['blank'];
    }

    if (!shortcut || shortcut === '') {
        errors['shortcut'] = ['blank'];
    }

    if (Object.keys(errors).length !== 0) {
        return { type: 'error', errors: errors };
    }

    return {
        type: 'dto',
        data: {
            name,
            shortcut,
            visible,
            // parent
        }
    };
};
