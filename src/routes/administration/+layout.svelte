<script lang="ts">
	import { setLocale } from '../../translations/i18n-svelte';
	import { loadAllLocales } from '../../translations/i18n-util.sync';
	import { page } from '$app/stores';
	import LL from '$translations/i18n-svelte';
	import type { Locales } from '$translations/i18n-types';

	loadAllLocales();

	const lang = ($page.params.lang as Locales) ?? 'cs';
	setLocale(lang);

	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';
	import Cookies from '$components/Cookies.svelte';
	import AdminNavbar from '$components/administration/AdminNavbar.svelte';
	import createSeasonStore from '$lib/stores/SeasonStore.svelte';
	import { createCharityStore } from '$lib/stores/CharityStore.svelte';
	import { createUserStore } from '$lib/stores/UserStore.svelte';
	import { setContext } from 'svelte';
	import Store from '$lib/enums/Stores';

	const seasonStore = createSeasonStore();
	const charityStore = createCharityStore();
	const userStore = createUserStore();

	setContext(Store.SEASON_STORE, seasonStore);
	setContext(Store.CHARITY_STORE, charityStore);
	setContext(Store.USER_STORE, userStore);
</script>

<svelte:head>
	<title>{$LL.homepage.title()}</title>
</svelte:head>

<Navbar />

<div class="container">
	<AdminNavbar />
	<div class="slot">
		<slot />
	</div>
</div>
<Footer />
<!-- <Cookies /> -->

<style>
	.slot {
		background-color: white;

		box-shadow: 0px 0px 10px #dee2e6;
		border-radius: 20px 0 0 0;

		padding: 35px;
		flex: 5;
	}

	.container {
		margin-top: 10px;
		display: flex;
		gap: 20px;
	}

	@media (max-width: 1000px) {
		.container {
			flex-direction: column;
		}

		.slot {
			margin-inline: 100px;
			border-radius: 20px 20px 0 0;
		}
	}
</style>
