<script lang="ts">
	import { setLocale } from '../../translations/i18n-svelte';
	import { loadAllLocales } from '../../translations/i18n-util.sync';
	import { page } from '$app/state';
	import LL from '$translations/i18n-svelte';
	import type { Locales } from '$translations/i18n-types';
	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';

	let { children, data } = $props();
	const lang = (page.params.lang as Locales) ?? 'cs';

	loadAllLocales();
	setLocale(lang);
</script>

<svelte:head>
	<title>{$LL.homepage.title()}</title>
</svelte:head>

<Navbar currentSeason={data.currentSeason} user={data.user} />
<main>
	<svelte:boundary>
		{@render children()}

		{#snippet pending()}
			Načítání
		{/snippet}
	</svelte:boundary>
</main>
<Footer />
<!-- <Cookies /> -->
