import type { BaseTranslation } from '../i18n-types';

const cs = {
	cookies: {
		title: 'Webová stránka využívá cookies',
		description:
			'Webová stránka využívá cookies, které jsou nezbytné pro jeho správné fungování. Používáním této webové stránky souhlasíte se zásadami používání souborů cookies.',
		accept: 'Souhlasím'
	},

	navbar: {
		rules: 'Pravidla',
		results: 'Výsledky',
		login: 'Přihlásit se',
		register: 'Registrovat',
		logout: 'Odhlásit se',
		administration: 'Administrace',
		submission: 'Nahrát aktivitu',
		profile: 'Profil',
		settings: 'Nastavení'
	},

	homepage: {
		title: 'Měsíční Vytrvalec',
		statistics: {
			users: 'UČASTNÍKŮ'
		},
		past_seasons: 'Předchozí ročníky',
		current_year: 'Ročník',
		charity: 'Charita'
	},

	registration: {
		title: 'Registrace',
		email: 'E-mail',
		password: 'Heslo',
		first_name: 'Jméno',
		last_name: 'Příjmení',
		faculty: 'Fakulta',
		gdpr: 'Souhlasím se zpracováním osobních údajů',
		submit: 'Registrovat',
		errors: {
			email: {
				blank: 'Vyplňte prosím svou e-mailovou adresu.',
				not_unique: 'Tato e-mailová adresa byla již registrována.'
			},
			password: {
				blank: 'Vyplňte prosím své heslo.',
				weak: 'Vaše heslo musí obsahovat alespoň 8 znaků a alespoň jedno číslo a speciální znak.'
			},
			first_name: {
				blank: 'Vyplňte prosím své jméno.'
			},
			last_name: {
				blank: 'Vyplňte prosím své příjmení.'
			},
			faculty: {
				invalid: 'Vybraná fakulta není platná.',
				no_faculties: 'Nepodarilo se najít fakulty'
			},
			gdpr: {
				blank: 'Prosím potvrďte souhlas se zpracováním osobních údajů.'
			}
		}
	},
	login: {
		title: 'Přihlášení',
		email: 'E-mail',
		password: 'Heslo',
		success: 'Přihlásení probehlo úspěšně',
		error: 'Přihlášení selhalo',
		errors: {
			email: {
				blank: 'Vyplňte prosím svou e-mailovou adresu.'
			},
			password: {
				blank: 'Vyplňte prosím své heslo.'
			},
			auth: {
				invalid_credentials: 'Neplatné přihlašovací údaje'
			}
		},
		submit: 'Přihlásit'
	},

	submission: {
		title: 'Aktivita',
		editingTitle: 'Upravit aktivitu',
		form: {
			image: 'Sem přetáhněte obrázek',
			chooseImage: 'Vybrat obrázek',
			distance: 'Vzdálenost',
			elevation: 'Převýšení',
			activity: 'Aktivita',
			submit: 'Nahrát',
			edit: 'Upravit',
			comment: 'Komentář k zamítnutí',
			success: 'Nahrání aktivity proběhlo úspěšně',
			error: 'Při nahrávání aktivity došlo k chybě',
			delete: 'Smazat',
			deleteConfirm: 'Opravdu chcete aktivitu smazat?',
			deleteSuccessToast: 'Aktivita smazána',
			deleteErrorToast: 'Při mazání aktivity došlo k chybě',
			editSuccessToast: 'Aktivita upravena',
			editErrorToast: 'Při úpravě aktivity došlo k chybě',
			errors: {
				image: {
					blank: 'Nahrajte prosím obrázek.',
					invalid: 'Nahrajte prosím platný obrázek.',
					too_large: 'Obrázek je příliš veliký, maximální velikost obrázku je 4MB.'
				},
				distance: {
					blank: 'Zadejte prosím vzdálenost',
					invalid: 'Vzdálenost musí být kladné celé číslo',
					negative: 'Vzdálenost musí být kladné celé číslo'
				},
				elevation: {
					invalid: 'Převýšení musí být kladné celé číslo',
					negative: 'Převýšení musí být kladné celé číslo'
				},
				activity: {
					blank: 'Prosím vyberte aktivitu.',
					invalid: 'Vybraná aktivita není platná.'
				}
			}
		},
		state: {
			pending: 'Zpracovává se',
			accepted: 'Schváleno',
			rejected: 'Zamítnuto'
		}
	},

	extraPoints: {
		weekly_distance: 'Vzdálenost za 1 týden',
		daily_distance: 'Vzdálenost za 1 den',
		weekly_elevation: 'Převýšení za týden'
	},

	account: {
		title: 'Účet',
		email: 'E-mail',
		password: 'Heslo',
		first_name: 'Jméno',
		last_name: 'Příjmení',
		faculty: 'Fakulta',
		old_password: 'Současné heslo',
		invalid_info: 'Pokud některé údaje nesedí, kontaktujte prosím administrátora',
		save: 'Uložit',
		success: 'Údaje byly úspěšně změněny',
		errors: {
			email: {
				blank: 'E-mail nesmí být prázdný'
			},
			password: {
				blank: 'Heslo nesmí být prázdné',
				weak: 'Heslo je příliš slabé'
			},
			old_password: {
				blank: 'Současne heslo nesmí být prázdné',
				mismatch: 'Současne heslo není správné'
			}
		}
	},
	results: {
		title: 'Výsledky sezóny',
		week_picker: ['Celá sezóna', 'První týden', 'Druhý týden', 'Třetí týden', 'Čtvrtý týden']
	},
	profile: {
		submissions: 'Aktivity',
		loading: {
			statistics: 'Načítání statistik...',
			submissions: 'načítání aktivit...'
		}
	},
	activities: {
		'Běh/Chůze': 'Běh a chůze',
		'Kolo/Koloběžka': 'Kolo a koloběžka'
	},
	icons: {
		'Běh/Chůze': 'runner',
		'Kolo/Koloběžka': 'bike'
		week_picker: ['Celá sezóna', 'První týden', 'Druhý týden', 'Třetí týden', 'Čtvrtý týden'],
        no_results: 'Zatím nejsou žádné výsledky pro tento týden či sezónu',
        faculty: 'Fakulta',
        distance: 'Vzdálenost',
        elevation: 'Převýšení',
        points: 'Body',
	}
} satisfies BaseTranslation;

export default cs;
