import type { BaseTranslation } from '../i18n-types';

const en = {
	cookies: {
		title: 'This website uses cookies',
		description:
			'This website uses cookies to ensure it can work properly. By using this website you agree to the use of cookies.',
		accept: 'Accept'
	},

	gdpr: {
		title: "Consent to the processing of personal data",
		description1: "The application allows the publication of participants' names who have earned bonus points for their faculty or achieved exceptional results.",
		description2: "Providing consent is voluntary. If you do not grant consent, your name will not be displayed, and only the faculty name will be shown. In this case, leave the corresponding field empty and confirm by saving.",
		description3: "You can change your consent at any time in your profile settings.",
		submit: "Submit"
	}, 

	navbar: {
		rules: 'Rules',
		results: 'Results',
		login: 'Login',
		register: 'Register',
		logout: 'Logout',
		administration: 'Administration',
		submission: 'Upload submission',
		profile: 'Profile',
		settings: 'Settings'
	},

	homepage: {
		title: 'Monthly Runner',
		statistics: {
			title: 'Statistics',
			users: 'TOTAL PARTICIPANTS'
		},
		intro:
			'The monthly runner event was created during the winter semester in 2020. This competition was prepared and organized by the Department of Physical Education and Sport of the University of West Bohemia with the intention to make students engage in sports during distance learning, which took place at the University of West Bohemia during the coronavirus pandemic.',
		past_seasons: 'Past seasons',
		current_year: 'Season',
		charity: 'Charity',
		about: {
			title: 'About',
			content:
				'Participants compete over a four-week period for their teams (faculty, university institute / rectorate / U3V) in the number of kilometres run and cycled. These are summed up within teams and at the end of the week to decide the number of points that a given team receives. The final sum of points will determine the overall team ranking.'
		}
	},

	registration: {
		title: 'Registration',
		email: 'E-mail',
		password: 'Password',
		password_repeat: 'Password repeat',
		password_strength_label: ["Very weak", "Weak", "Sufficient", "Medium", "Strong", "Very strong"],	
		first_name: 'First name',
		last_name: 'Last name',
		faculty: 'Faculty',
		gdpr: 'I consent to the processing of my personal data in accordance with GDPR.',
		submit: 'Register',
		errors: {
			email: {
				blank: 'Email address cannot be empty.',
				not_unique: 'This email address is already registered.',
				invalid: 'Invalid email address.'
			},
			password: {
				blank: 'Password cannot be empty.',
				weak: 'Your password must be at least "sufficient"'
			},
			password_repeat: {
				password_mismatch: 'Passwords must match.'
			},
			first_name: {
				blank: 'First name cannot be empty.'
			},
			last_name: {
				blank: 'Last name cannot be empty.'
			},
			faculty: {
				invalid: 'Please select a valid faculty.',
				no_faculties: 'Unable to fetch faculties'
			},
			gdpr: {
				blank: 'Please confirm that you agree to our data processing policy.'
			}
		},
		error: 'Registration failed.',
		success: 'Registration successful.'
	},
	login: {
		title: 'Login',
		email: 'E-mail',
		password: 'Password',
		success: 'Login successful',
		error: 'Login failed',
		errors: {
			email: {
				blank: 'Please enter your email address.'
			},
			password: {
				blank: 'Please enter your password.'
			},
			auth: {
				invalid_credentials: 'Invalid credentials'
			}
		},
		submit: 'Login',
		forgotten: {
			title: 'Forgotten password',
			prompt: 'Forgot your password?',
			submit: 'Submit',
			description: 'Link to password reset will be sent to the email address.',
			success: 'E-mail sent',
			error: 'An error occurred while sending an e-mail'
		}
	},

	submission: {
		title: 'Submission',
		editingTitle: 'Edit submission',
		form: {
			image: 'Drag image here',
			chooseImage: 'Choose image',
			distance: 'Distance',
			elevation: 'Elevation',
			activity: 'Activity',
			submit: 'Submit',
			edit: 'Edit',
			preview: 'Preview',
			comment: 'Comment',
			success: 'Uploaded activity successfully',
			error: 'Error while uploading activity',
			delete: 'Delete',
			deleteConfirm: 'Do you really want to delete this activity?',
			deleteSuccessToast: 'Submission deleted',
			deleteErrorToast: 'An error occured during submission deletion',
			editSuccessToast: 'Submission edited',
			editErrorToast: 'An error occured during submission editing',
			errors: {
				image: {
					blank: 'Please upload an image.',
					invalid: 'Please upload a valid image.',
					too_large: 'The image is too large. Please upload an image with a size less than 15MB.'
				},
				distance: {
					blank: 'Please enter a distance.',
					invalid: 'Distance must be a positive integer.',
					negative: 'Distance must be a positive integer.'
				},
				elevation: {
					invalid: 'Elevation must be a positive integer.',
					negative: 'Elevation must be a positive integer.'
				},
				activity: {
					blank: 'Please select an activity.',
					invalid: 'The selected activity is not valid.'
				}
			}
		},
		state: {
			pending: 'Pending',
			accepted: 'Accepted',
			rejected: 'Rejected'
		},
		errors: {
			mismatch_updated_at:
				'Another administrator changed this submission. Please refresh the page and try again.'
		}
	},

	extraPoints: {
		weekly_distance: 'Distance per week',
		daily_distance: 'Distance per day',
		weekly_elevation: 'Elevation per activity'
	},

	account: {
		title: 'Account',
		email: 'E-mail',
		password: 'New password',
		password_repeat: 'New password repeat',
		first_name: 'First name',
		last_name: 'Last name',
		faculty: 'Faculty',
		old_password: 'Current password',
		invalid_info: "If there's any incorrect info, please contact the administrator.",
		save: 'Save',
		success: 'Account details were successfully updated',
		errors: {
			email: {
				blank: 'E-mail cannot be empty'
			},
			password: {
				blank: 'Password cannot be empty',
				weak: 'Your password must be at least "sufficient"'
			},
			old_password: {
				blank: 'Current password cannot be empty',
				mismatch: 'Current password is incorrect'
			},
			password_repeat: {
				password_mismatch: 'New passwords must match.'
			}
		}
	},
	results: {
		title: 'Season Results',
		results: 'Results',
		week_picker: ['Whole Season', 'First Week', 'Second Week', 'Third Week', 'Fourth Week'],
		no_results: 'There are no results for this week or season yet',
		faculty: 'Faculty',
		distance: 'Distance',
		elevation: 'Elevation',
		points: 'Points',
		total: 'Total',
		by_faculty: 'Participants by faculty',
		count: 'Count',
		top3: 'TOP 3 contestants',
		no_top: "No top contestants yet",
		extras: {
			title: "Extra points",
			name: "Name",
			faculty: "Faculty",
			category: "Category",
			activity: "Activity",
			value: "Value",
			points: "Points"
		}
	},
	profile: {
		submissions: 'Submissions',
		loading: {
			statistics: 'Loading user statistics...',
			submissions: 'Loading user submissions...'
		},
		noSubmissions: 'You have no submissions'
	},
	reset: {
		title: 'Change password',
		password: 'Password',
		passwordRepeat: 'Password repeat',
		success: 'Password has been changed',
		error: 'An error occurred when changing the password',
		submit: 'Change',
		errors: {
			blank: 'New password cannot be empty.',
			password_mismatch: 'Passwords must match.',
			weak: 'Your password must be at least "sufficient"'
		}
	},
	activities: {
		'Běh/Chůze': 'Run and walk',
		'Kolo/Koloběžka': 'Bike and scooter',
        total: 'Total',
	},
	rules: {
		title: 'Rules',
		challengeTitle: 'Challenge rules',
		intro: {
			content1:
				'Run, walk, bike, scooter, skate! Not only will you do something for your health, but you will contribute to a good cause! The kilometres that the contestants travel will be converted into crowns and we will donate them to charity.',
			content2:
				'We will evaluate the continuous number of kilometers covered by faculties and non-faculty departments after each week and each faculty or department has the opportunity to get points for the overall evaluation.'
		},
		disciplines: {
			title: 'The competition is held in two disciplines'
		},
		progress: {
			title: 'The course of the competition',
			content1:
				'Users record their physical activities through a mobile app on their phone and upload them to this portal.',
			content2:
				'Each week the number of kilometres covered in the given disciplines is evaluated. The first team gets 15 points in each discipline (depending on the number of participating faculties and departments), the second 14 points, the third 13 points, etc. The overall winner of the challenge will be the team that scores the most points over the 4 weeks in the sum of both disciplines.'
		},
		extraPoints: {
			title: 'Extra points!',
			intro: 'Individuals can earn extra points for their faculty.',
			thirdWeek: {
				title: 'Week Three',
				extraOne:
					'for the individual who runs/walk/rides the most kilometres in one day in a given discipline.',
				extraTwo:
					'for the individual with the highest total kilometres for the whole week in the given discipline.'
			},
			fourthWeek: {
				title: 'Week Four',
				extraOne:
					'for the individual with the highest elevation gain for one activity in a given discipline. Walking more than 1000m and riding more than 1500m.'
			},
			extraPoint: 'Extra point',
			extraPoints: 'Extra points'
		}
	},
	faculties: {
		FAV: 'Faculty of Applied Sciences',
		FDU: 'Ladislav Sutnar Faculty of Design and Art',
		FEK: 'Faculty of Economics',
		FEL: 'Faculty of Electrical Engineering',
		FF: 'Faculty of Arts',
		FPE: 'Faculty of Education',
		FPR: 'Faculty of Law',
		FST: 'Faculty of Mechanical Engineering',
		FZS: 'Faculty of Health Care Studies',
		REK: 'Rectorate',
		NTC: 'New Technologies - Research Centre',
		U3V: 'University of Third Age',
		UJP: 'Institute of Applied Language Studies',
		KNIHOVNA: 'Library',
		CIV: 'Information Technology Centre',
		SUZN: 'ŠUZ Nečtiny'
	},
	server: {
		server_down: 'Service unavailable, please try again later.'
	}
} satisfies BaseTranslation;

export default en;
