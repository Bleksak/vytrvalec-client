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
	// import Cookies from '$components/Cookies.svelte';
	let { children } = $props();
	const lang = (page.params.lang as Locales) ?? 'cs';
	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);
	const context = getAllContexts();

	const currentUser: UserResponse = page.data.user;
	const showGdprPopup = currentUser != null && currentUser.acceptedGdpr == null;

	loadAllLocales();
	setLocale(lang);

	const getCookie = (name: string) => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [key, value] = cookie.split("=");
            if (key === name) return value;
        }
        return null;
    }

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
<!-- <Cookies /> -->
