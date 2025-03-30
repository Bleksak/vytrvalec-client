<script lang="ts">
	import { setLocale } from '../../translations/i18n-svelte';
	import { loadAllLocales } from '../../translations/i18n-util.sync';
	import { page } from '$app/state';
	import LL from '$translations/i18n-svelte';
	import type { Locales } from '$translations/i18n-types';
	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import { getAllContexts, getContext, onMount } from 'svelte';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import Store from '$lib/enums/Stores';
	import GdprForm from '$components/forms/GdprForm.svelte';
	import Cookies from '$components/Cookies.svelte';
	import { getCookie } from '$utils/cookies';

	let { children } = $props();
	const lang = (page.params.lang as Locales) ?? 'cs';
	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);
	const context = getAllContexts();

	const currentUser: UserResponse = page.data.user;
	const showGdprPopup = currentUser != null && currentUser.accepted_gdpr == null;

	loadAllLocales();
	setLocale(lang);


	onMount(() => {
		if(!getCookie("gdprPopupShown") && showGdprPopup) {
			dialogStore.open(GdprForm, {}, context)
			document.cookie = "gdprPopupShown=true; path=/; max-age=604800"; //Týden
		}
	})
</script>

<svelte:head>
	<title>{$LL.homepage.title()}</title>
</svelte:head>

<Navbar />
{@render children()}
<Footer />
<Cookies />
