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
			title: 'Statistiky',
			users: 'UČASTNÍKŮ'
		},
		intro:
			'Akce měsíční vytrvalec vznikla během zimního semestru v roce 2020. Tuto pohybovou soutěž připravila a zorganizovala Katedra tělesné výchovy Fakulty strojní Západočeské univerzity v Plzni s úmyslem rozhýbat studenty během distanční výuky, která probíhala na ZČU během koronavirové pandemie.',
		past_seasons: 'Předchozí ročníky',
		current_year: 'Ročník',
		charity: 'Charita',
		about: {
			title: 'O výzvě',
			content:
				'Účastníci bojují čtyři týdny za svoje týmy (fakulta, VŠ ústav / rektorátní pracoviště / U3V) v počtu naběhaných a naježděných kilometrů. Ty se v rámci týmů sčítají a v závěru týdne určují počet bodů, které daný tým získá a podle toho se umístí v celkovém pořadí.'
		}
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
		submit: 'Přihlásit',
		forgotten: {
			title: 'Zapomenuté heslo',
			prompt: 'Zapomněli jste heslo?',
			submit: 'Odeslat',
			description: 'Na e-mailovou adresu bude zaslán odkaz k obnovení hesla.',
			success: 'E-mail odeslán',
			error: 'Nastala chyba při odesílání e-mailu'
		}
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
		results: 'Výsledky',
		week_picker: ['Celá sezóna', 'První týden', 'Druhý týden', 'Třetí týden', 'Čtvrtý týden'],
		no_results: 'Zatím nejsou žádné výsledky pro tento týden či sezónu',
		faculty: 'Fakulta',
		distance: 'Vzdálenost',
		elevation: 'Převýšení',
		points: 'Body'
	},
	profile: {
		submissions: 'Aktivity',
		loading: {
			statistics: 'Načítání statistik...',
			submissions: 'načítání aktivit...'
		},
		noSubmissions: 'Zatím nemáte žádné aktivity'
	},
	reset: {
		title: 'Změna hesla',
		password: 'Heslo',
		passwordRepeat: 'Heslo znova',
		success: 'Heslo bylo změněno',
		error: 'Nastala chyba při změně hesla',
		submit: 'Změnit'
	},
	activities: {
		'Běh/Chůze': 'Běh a chůze',
		'Kolo/Koloběžka': 'Kolo a koloběžka'
	},
	icons: {
		'Běh/Chůze': 'runner',
		'Kolo/Koloběžka': 'bike'
	},
	rules: {
		title: 'Pravidla',
		challengeTitle: 'Pravidla výzvy',
		intro: {
			content1:
				'Běhejte, choďte jezděte na kole, koloběžce, bruslích! Nejen, že uděláte něco pro svoje zdraví, ale přispějete na dobrou věc! Kilometry, které soutěžící urazí se přemění na koruny a přispějeme tím na charitu.',
			content2:
				'Průběžný počet najetých a uběhnutých kilometrů fakult a mimofakultních pracovišť budeme vyhodnocovat po týdnu a každá fakulta či pracoviště mají možnost získat body do celkového hodnocení.'
		},
		disciplines: {
			title: 'Soutěž probíhá ve dvou disciplínách'
		},
		progress: {
			title: 'Průběh soutěže',
			content1:
				'Uživatelé zaznamenávají své pohybové aktivity prostřednictvím některé mobilní aplikace na svůj telefon a nahrají je na tento portál.',
			content2:
				'Každý týden se vyhodnocuje počet uražených kilometrů v daných disciplínách. První tým dostane v každé disciplíně např. 15 bodů (podle počtu zůčastněných fakult a pracovišť), druhý 14 bodu, třetí 13 bodů, apod. Celkovým vítězem výzvy se stane tým, který získá nejvíce bodů za 4 týdny v součtu obou disciplín.'
		},
		extraPoints: {
			title: 'Extra body!',
			intro: 'Jednotlivci mohou pro svou fakultu získat extra body.',
			thirdWeek: {
				title: 'Třetí týden',
				extraOne:
					'pro jednotlivce, který uběhne/ujde/ujede nejvíce kilometrů v jednom dni v dané disciplíně.',
				extraTwo: 'pro jednotlivce s největším součtem kilometrů za celý týden v dané disciplíně.'
			},
			fourthWeek: {
				title: 'Čtvrtý týden',
				extraOne:
					'pro jednotlivce s největším převýšením za celý týden v dané disciplíně. Chůze více než 1000m a jízda více než 1500m.'
			},
			extraPoint: 'Extra bod',
			extraPoints: 'Extra body'
		}
	},
	faculties: {
		FAV: 'Fakulta aplikovaných věd',
		FDU: 'Fakulta designu a umění Ladislava Sutnara',
		FEK: 'Fakulta ekonomická',
		FEL: 'Fakulta elektrotechnická',
		FF: 'Fakulta filozofická',
		FPE: 'Fakulta pedagogická',
		FPR: 'Fakulta právnická',
		FST: 'Fakulta strojní',
		FZS: 'Fakulta zdravotních studií',
		REK: 'Rektorát',
		NTC: 'Nové technologie - výzkumné centrum',
		U3V: 'Univerzita třetího věku',
		UJP: 'Ústav jazykové přípravy'
	}
} satisfies BaseTranslation;

export default cs;
