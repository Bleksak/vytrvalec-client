import { PasswordEstimator } from '$lib/PasswordEstimator';
import type { RegistrationError } from './UserRegisterResponse';

export type UserRegisterDTO = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    faculty: number;
    anonymize: boolean;
};

export type UserRegisterReturn =
    | {
          type: 'dto';
          value: UserRegisterDTO;
      }
    | {
          type: 'error';
          value: RegistrationError;
      };

export const formDataToUserRegisterDTO = (formData: FormData): UserRegisterReturn => {
    const email = formData.get('email')?.toString();
    let errors: RegistrationError = {};

    if (email === undefined || email === '') {
        errors['email'] = ['blank'];
    }

    const password = formData.get('password')?.toString();

    if (password === undefined || password === '') {
        errors['password'] = ['blank'];
    }

    const strength = PasswordEstimator.estimateStrength(password);

    if (strength < 2) {
        errors['password'] = ['weak'];
    }

    const password_repeat = formData.get('password_repeat')?.toString();

    if (password_repeat !== password) {
        errors['password_repeat'] = ['password_mismatch'];
    }

    const firstName = formData.get('first_name')?.toString();

    if (firstName === undefined || firstName === '') {
        errors['first_name'] = ['blank'];
    }

    const lastName = formData.get('last_name')?.toString();

    if (lastName === undefined || lastName === '') {
        errors['last_name'] = ['blank'];
    }

    const faculty = Number(formData.get('faculty')?.toString());

    if (faculty === Number.NaN || !Number.isInteger(faculty)) {
        errors['faculty'] = ['invalid'];
    }

    const gdpr = formData.get('gdpr');
    if (gdpr === null || (!Boolean(Number(gdpr)) && gdpr !== 'on')) {
        errors['gdpr'] = ['blank'];
    }

    const anonymize = Boolean(formData.get('anonymize'));

    if (Object.keys(errors).length !== 0) {
        return { type: 'error', value: errors };
    }

    return {
        type: 'dto',
        value: {
            email: email!,
            password: password!,
            first_name: firstName!,
            last_name: lastName!,
            faculty: faculty,
            anonymize: !anonymize,
        },
    };
};
