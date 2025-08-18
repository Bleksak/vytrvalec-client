import type { BaseTranslation } from '../i18n-types';

const cs = {
	cookies: {
		title: 'Webová stránka využívá cookies',
		description:
			'Webová stránka využívá cookies, které jsou nezbytné pro jeho správné fungování. Používáním této webové stránky souhlasíte se zásadami používání souborů cookies.',
		accept: 'Souhlasím'
	},

	anonym: {
		title: 'Upravit předvolbu anonymizace',
		description1:
			'Aplikace umožňuje zveřejnění jmen účastníků, kteří získali bonusové body pro svou fakultu nebo dosáhli mimořádných výsledků.',
		description2:
			'Poskytnutí souhlasu je dobrovolné. Pokud souhlas neudělíte, vaše jméno nebude zveřejněno a zobrazí se pouze název fakulty. V takovém případě ponechte příslušné pole prázdné a potvrďte uložením.',
		description3: 'Svůj souhlas můžete kdykoli změnit v nastavení profilu.',
		label: 'Souhlasím se zveřejněním celého jména v sekci Výsledky',
		submit: 'Uložit'
	},

	navbar: {
		rules: 'Pravidla',
		results: 'Výsledky',
		login: 'Přihlášení',
		register: 'Registrace',
		logout: 'Odhlásit',
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
		android: {
			available: 'Dostupné na Google Play',
			get: 'Získat'
		},
		mobile_app: {
			title: 'Mobilní aplikace Měsíčního Vytrvalce',
			download: 'Dostupná ke stažení na Google Play i App Store'
		},
		intro:
			'Akce měsíční vytrvalec vznikla během zimního semestru v roce 2020. Tuto pohybovou soutěž připravila a zorganizoval Ústav tělesné výchovy a sportu ZČU s úmyslem rozhýbat studenty během distanční výuky, která probíhala na ZČU během koronavirové pandemie.',
		past_seasons: 'Předchozí ročníky',
		current_year: 'Ročník',
		charity: 'Charita',
		about: {
			title: 'O Výzvě',
			content:
				'Účastníci bojují čtyři týdny za svoje týmy (fakulta, VŠ ústav / rektorátní pracoviště / U3V) v počtu naběhaných a naježděných kilometrů. Ty se v rámci týmů sčítají a v závěru týdne určují počet bodů, které daný tým získá a podle toho se umístí v celkovém pořadí.'
		}
	},

	season_detail: {
		title: 'Detail Sezóny',
		date_range: '{start: Date|long_date} - {end: Date|long_date}',
		ordinal: {
			first: 'První místo: {name: string}',
			second: 'Druhé místo: {name: string}',
			third: 'Třetí místo: {name: string}'
		},
		raised: 'Vybráno {raised: number|currency}',
		no_description: 'Charita nemá žádný popisek',
		no_image: 'Charita nemá obrázek',
		visit_charity: 'Navštivte web charity'
	},

	registration: {
		title: 'Registrace',
		email: 'E-mail',
		password: 'Heslo',
		password_repeat: 'Heslo znovu',
		password_strength_label: [
			'Velmi slabé',
			'Slabé',
			'Dostačující',
			'Středně silné',
			'Silné',
			'Velmi silné'
		],
		first_name: 'Jméno',
		last_name: 'Příjmení',
		faculty: 'Fakulta',
		gdpr: 'Souhlasím se zpracováním osobních údajů',
		gdpr_tooltip:
			'Jméno, příjmení a emailová adresa jsou zpracovávány pouze pro nezbytné fungování aplikace a nejsou sdíleny s žádnou třetí stranou',
		submit: 'Registrovat',
		errors: {
			email: {
				blank: 'E-mailová adresa nesmí být prázdná.',
				not_unique: 'Tato e-mailová adresa byla již registrována.',
				invalid: 'Neplatná e-mailová adresa.'
			},
			password: {
				blank: 'Heslo nesmí být prázdné.',
				weak: 'Vaše heslo musí být minimálně "dostačující"'
			},
			password_repeat: {
				password_mismatch: 'Hesla se musí shodovat.'
			},
			first_name: {
				blank: 'Jméno nesmí být prázdné.'
			},
			last_name: {
				blank: 'Příjmení nesmí být prázdné.'
			},
			faculty: {
				invalid: 'Vybraná fakulta není platná.',
				no_faculties: 'Nepodařilo se najít fakulty'
			},
			gdpr: {
				blank: 'Prosím potvrďte souhlas se zpracováním osobních údajů.'
			}
		},
		error: 'Registrace selhala.',
		success: 'Registrace proběhla úspěšně.'
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
			preview: 'Náhled',
			comment: 'Komentář',
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
					too_large: 'Obrázek je příliš veliký, maximální velikost obrázku je 15MB.'
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
		},
		errors: {
			mismatch_updated_at:
				'Jiný administrátor změnil tuto aktivitu. Aktualizujte stránku a opakujte akci.'
		}
	},

	extraPoints: {
		weekly_distance: 'Vzdálenost za 1 týden',
		daily_distance: 'Vzdálenost za 1 den',
		weekly_elevation: 'Převýšení za aktivitu'
	},

	account: {
		title: 'Účet',
		email: 'E-mail',
		password: 'Nové heslo',
		password_repeat: 'Nové heslo znova',
		first_name: 'Jméno',
		last_name: 'Příjmení',
		faculty: 'Fakulta',
		old_password: 'Současné heslo',
		invalid_info: 'Pokud některé údaje nesedí, kontaktujte nás na email vytrvale@ntis.zcu.cz',
		save: 'Uložit',
		success: 'Údaje byly úspěšně změněny',
		emailing: {
			description: 'Přeji si dostávat emaily',
			success: 'Odebírání emailů úspěšně změněno',
			error: 'Nastala chyba při úpravě odběru emailů'
		},
		delete: {
			title: 'Smazat účet',
			desc1: 'Smazání účtu je nevratné. Tato akce nelze vzít zpět.',
			desc2:
				'Po stisknutí tlačítka odstranit bude váš účet okamžitě zpracován ke smazání a všechna data budou trvale odstraněna.',
			desc3: 'Jakmile účet smažete, již ho nelze obnovit.',
			desc4:
				'Měsíční Vytrvalec si bude nadále uchovávat Vaše sdílené aktivity za účelem uchování statistik uplynulých ročníků soutěže. Nebudou ovšem nijak spojeny s vaším stávajícím účtem.',
			submit: 'Odstranit',
			success: 'Účet odstraněn',
			error: 'Nastala chyba při odstraňování účtu'
		},
		password_change: 'Změna hesla',
		errors: {
			email: {
				blank: 'E-mail nesmí být prázdný',
				invalid: 'E-mail je neplatný',
				no_update: 'Není co upravit'
			},
			password: {
				blank: 'Heslo nesmí být prázdné',
				weak: 'Vaše heslo musí být minimálně "dostačující"'
			},
			old_password: {
				blank: 'Současne heslo nesmí být prázdné',
				mismatch: 'Současne heslo není správné'
			},
			password_repeat: {
				password_mismatch: 'Nové hesla se musí shodovat.'
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
		points: 'Body',
		total: 'Celkem',
		by_faculty: 'Účastníci podle fakult',
		count: 'Počet',
		top3: 'TOP 3 účastníci',
		no_top: 'Zatím žádní',
		total_gained: 'Celkem vybráno',
		extras: {
			title: 'Extra body',
			name: 'Jméno',
			faculty: 'Fakulta',
			category: 'Kategorie',
			activity: 'Aktivita',
			value: 'Výkon',
			points: 'Body'
		}
	},
	profile: {
		submissions: 'Aktivity',
		loading: {
			statistics: 'Načítání statistik...',
			submissions: 'Načítání aktivit...'
		},
		noSubmissions: 'Zatím nemáte žádné aktivity'
	},
	reset: {
		title: 'Změna hesla',
		password: 'Heslo',
		passwordRepeat: 'Heslo znova',
		success: 'Heslo bylo změněno',
		error: 'Nastala chyba při změně hesla',
		submit: 'Změnit',
		errors: {
			blank: 'Nové heslo nesmí být prázdné.',
			password_mismatch: 'Hesla se musí shodovat.',
			weak: 'Vaše heslo musí být minimálně "dostačující"'
		}
	},
	activity: {
		errors: {
			min_elevation: {
				negative: 'Převýšení musí být kladné číslo'
			},
			'name,cz': {
				min_length: 'Název nesmí být prázdný'
			},
			'name,en': {
				min_length: 'Název nesmí být prázdný'
			},
			image: {

			}
		}
	},
	activities: {
		'Běh/Chůze': 'Běh a chůze',
		'Kolo/Koloběžka': 'Kolo, koloběžka a brusle',
		total: 'Celkové hodnocení'
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
				'Uživatelé zaznamenávají své cílené pohybové aktivity prostřednictvím některé mobilní aplikace na svůj telefon a nahrají je na tento portál. Pro zaznamenávání cílových aktivit můžete využít např. aplikaci Garmin Connect, nebo Strava.',
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
					'pro jednotlivce s největším převýšením v jedné aktivitě v dané disciplíně. Chůze více než 1000m a jízda více než 1500m.'
			},
			extraPoint: 'Extra bod',
			extraPoints: 'Extra body'
		},
		target_activities: {
			title: 'Cílová pohybová aktivita',
			body: 'Jdu si zaběhat, zapnu si aktivitu a vypnu si aktivitu. Jdu se projít, zapnu si aktivitu a vypnu si aktivitu. Jedu na kole, zapnu si aktivitu a vypnu si aktivitu.',
			supplement:
				'Cílová pohybová aktivita NENÍ součet nachozených kilometrů za den. Pro zaznamenávání cílových aktivit můžete využít např. aplikaci Garmin Connect, nebo Strava.'
		}
	},
	footer: {
		contact: 'Kontaktujte nás:',
		managed_by: 'Správa webu'
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
		FZS: 'Fakulta zdravotnických studií',
		REK: 'Rektorát',
		NTC: 'Nové technologie - výzkumné centrum',
		U3V: 'Univerzita třetího věku',
		UJP: 'Ústav jazykové přípravy',
		KNIHOVNA: 'Knihovna',
		CIV: 'Centrum informatizace a výpočetní techniky',
		SUZN: 'ŠUZ Nečtiny',
		UTS: 'Ústav tělesné výchovy a sportu'
	},
	server: {
		server_down: 'Server není dostupný, opakujte akci později.'
	}
} satisfies BaseTranslation;

export default cs;
