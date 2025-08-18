<script lang="ts">
	import { setLocale } from '../../translations/i18n-svelte';
	import { loadAllLocales } from '../../translations/i18n-util.sync';
	import { page } from '$app/state';
	import LL from '$translations/i18n-svelte';
	import type { Locales } from '$translations/i18n-types';
	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';
	import createSeasonStore from '$lib/stores/SeasonStore.svelte';
	import { createCharityStore } from '$lib/stores/CharityStore.svelte';
	import { createUserStore } from '$lib/stores/UserStore.svelte';
	import { setContext } from 'svelte';
	import Store from '$lib/enums/Stores';
	import createFacultyStore from '$lib/stores/FacultyStore.svelte';

	let { children } = $props();
	loadAllLocales();

	const lang = (page.params.lang as Locales) ?? 'cs';
	setLocale(lang);

	const seasonStore = createSeasonStore();
	const charityStore = createCharityStore();
	const userStore = createUserStore();
	const facultyStore = createFacultyStore();

	setContext(Store.SEASON_STORE, seasonStore);
	setContext(Store.CHARITY_STORE, charityStore);
	setContext(Store.USER_STORE, userStore);
	setContext(Store.FACULTY_STORE, facultyStore);
</script>

<svelte:head>
	<title>{$LL.homepage.title()}</title>
</svelte:head>

<Navbar />

<main>
	<section class="grid">
		<aside>
			<nav>
				<ul>
					<li>
						<a href="/administration/activity">Aktivity</a>
					</li>
					<li>
						<a href="/administration/season">Sezóny</a>
					</li>
					<li>
						<a href="/administration/charity">Charity</a>
					</li>
					<li>
						<a href="/administration/faculty">Fakulty</a>
					</li>
					<li>
						<a href="/administration/user">Uživatelé</a>
					</li>
					<li>
						<a href="/administration/submission">Uživatelské příspěvky</a>
					</li>
				</ul>
			</nav>
		</aside>
		{@render children()}
	</section>
</main>
<Footer />

<!-- <Cookies /> -->

<style>
	.grid {
		grid-template-columns: 240px 1fr;
	}
</style>
