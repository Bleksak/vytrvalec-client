import type { ResponseError, ResponseErrorMap } from '$lib/ResponseErrors';

export type ConsentChangeDTO = {
    gdpr: string;
};

export type ConsentError = ResponseErrorMap<ConsentChangeDTO> & {
    auth?: Array<ResponseError>;
};

export type ConsentChangeReturn =
    | {
        type: 'dto';
        value: ConsentChangeDTO;
    }
    | {
        type: 'error';
        value: ConsentError;
    };  

export const formDataToConsentChangeDTO = (formData: FormData): ConsentChangeReturn => {
    let errors: ConsentError = {}
    
    const gdpr = formData.get('gdpr')?.toString();
    
    if (!gdpr) {
        errors['gdpr'] = ['blank'];
    }
   
    if (Object.keys(errors).length !== 0) {
        return { type: 'error', value: errors };
    }
    
    return {
        type: 'dto',
        value: {
            gdpr: gdpr!,
        }
    };
};
