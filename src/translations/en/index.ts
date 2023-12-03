import type { BaseTranslation } from '../i18n-types'

const en = {
    navbar: {
        rules: 'Rules',
        results: 'Results',
        login: 'Login',
        register: 'Register',
    },

    homepage: {
        title: 'Monthly Runner',
        statistics: {
            users: "TOTAL PARTICIPANTS"
        },
    },

    registration: {
        title: "Registration",
        email: "E-mail",
        password: "Password",
        first_name: "First name",
        last_name: "Last name",
        faculty: "Faculty",
        gdpr: "I consent to the processing of my personal data in accordance with GDPR.",
        submit: "Register",
        errors: {
            email: {
                blank: 'Please enter your email address.',
                not_unique: 'This email address is already registered.',
            },
            password: {
                blank: 'Please enter your password.',
                weak: 'Your password must be at least 8 characters long and contain at least one number and one special character.',
            },
            first_name: {
                blank: 'Please enter your first name.',
            },
            last_name: {
                blank: 'Please enter your last name.',
            },
            faculty: {
                invalid: 'Please select a valid faculty.',
            },
            gdpr: {
                blank: 'Please confirm that you agree to our data processing policy.',
            },
        }
    }
} satisfies BaseTranslation;

export default en;
