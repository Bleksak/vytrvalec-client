import type { BaseTranslation } from '../i18n-types';

const en = {
	cookies: {
		title: 'This website uses cookies',
		description:
			'This website uses cookies to ensure it can work properly. By using this website you agree to the use of cookies.',
		accept: 'Accept'
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
			users: 'TOTAL PARTICIPANTS'
		},
		past_seasons: 'Past seasons',
		current_year: 'Season',
		charity: 'Charity'
	},

	registration: {
		title: 'Registration',
		email: 'E-mail',
		password: 'Password',
		first_name: 'First name',
		last_name: 'Last name',
		faculty: 'Faculty',
		gdpr: 'I consent to the processing of my personal data in accordance with GDPR.',
		submit: 'Register',
		errors: {
			email: {
				blank: 'Please enter your email address.',
				not_unique: 'This email address is already registered.'
			},
			password: {
				blank: 'Please enter your password.',
				weak: 'Your password must be at least 8 characters long and contain at least one number and one special character.'
			},
			first_name: {
				blank: 'Please enter your first name.'
			},
			last_name: {
				blank: 'Please enter your last name.'
			},
			faculty: {
				invalid: 'Please select a valid faculty.',
				no_faculties: 'Unable to fetch faculties'
			},
			gdpr: {
				blank: 'Please confirm that you agree to our data processing policy.'
			}
		}
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
		submit: 'Login'
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
			comment: 'Rejection comment',
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
					too_large: 'The image is too large. Please upload an image with a size less than 4MB.'
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
		}
	},

	extraPoints: {
		weekly_distance: 'Distance per week',
		daily_distance: 'Distance per day',
		weekly_elevation: 'Elevation per week'
	},

	account: {
		title: 'Account',
		email: 'E-mail',
		password: 'Password',
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
				weak: 'Password is too weak'
			},
			old_password: {
				blank: 'Current password cannot be empty',
				mismatch: 'Current password is incorrect'
			}
		}
	},
	results: {
		title: 'Season Results',
		week_picker: ['Whole Season', 'First Week', 'Second Week', 'Third Week', 'Fourth Week']
	},
	profile: {
		submissions: 'Submissions',
		loading: {
			statistics: 'Loading user statistics...',
			submissions: 'Loading user submissions...'
		}
	},
	activities: {
		'Běh/Chůze': 'Run and walk',
		'Kolo/Koloběžka': 'Bike and scooter'
	},
		week_picker: ['Whole Season', 'First Week', 'Second Week', 'Third Week', 'Fourth Week'],
        no_results: 'There are no results for this week or season yet',
        faculty: 'Faculty',
        distance: 'Distance',
        elevation: 'Elevation',
        points: 'Points',
	}
} satisfies BaseTranslation;

export default en;
