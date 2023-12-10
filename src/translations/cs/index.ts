import type { BaseTranslation } from '../i18n-types'

const cs = {
    navbar: {
        rules: 'Pravidla',
        results: 'Výsledky',
        login: 'Přihlásit se',
        register: 'Registrovat',
        logout: 'Odhlásit se',
        administration: 'Administrace',
    },

    homepage: {
        title: 'Měsíční Vytrvalec',
        statistics: {
            users: "UČASTNÍKŮ"
        },
    },

    registration: {
        title: "Registrace",
        email: "E-mail",
        password: "Heslo",
        first_name: "Jméno",
        last_name: "Příjmení",
        faculty: "Fakulta",
        gdpr: "Souhlasím se zpracováním osobních údajů",
        submit: "Registrovat",
        errors: {
            email: {
                blank: 'Vyplňte prosím svou e-mailovou adresu.',
                not_unique: 'Tato e-mailová adresa byla již registrována.',
            },
            password: {
                blank: 'Vyplňte prosím své heslo.',
                weak: 'Vaše heslo musí obsahovat alespoň 8 znaků a alespoň jedno číslo a speciální znak.',
            },
            first_name: {
                blank: 'Vyplňte prosím své jméno.',
            },
            last_name: {
                blank: 'Vyplňte prosím své příjmení.',
            },
            faculty: {
                invalid: 'Vybraná fakulta není platná.',
            },
            gdpr: {
                blank: 'Prosím potvrďte souhlas se zpracováním osobních údajů.',
            },
        }
    },
    login: {
        title: "Přihlášení",
        email: "E-mail",
        password: "Heslo",
        errors: {
            email: {
                blank: 'Vyplňte prosím svou e-mailovou adresu.',
            },
            password: {
                blank: 'Vyplňte prosím své heslo.',
            },
        },
        submit: "Přihlásit",
    }
} satisfies BaseTranslation;

export default cs
