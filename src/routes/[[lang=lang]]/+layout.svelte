<script lang="ts">
	import { setLocale } from '../../translations/i18n-svelte';
	import { loadAllLocales } from '../../translations/i18n-util.sync';
	import { page } from '$app/state';
	import LL from '$translations/i18n-svelte';
	import type { Locales } from '$translations/i18n-types';
	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';
	// import Cookies from '$components/Cookies.svelte';
	let { children } = $props();
	loadAllLocales();

	const lang = (page.params.lang as Locales) ?? 'cs';
	setLocale(lang);
</script>

<svelte:head>
	<title>{$LL.homepage.title()}</title>
</svelte:head>

<Navbar />
{@render children()}
<Footer />
<!-- <Cookies /> -->
