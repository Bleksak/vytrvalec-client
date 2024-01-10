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
</script>

<svelte:head>
	<title>{$LL.homepage.title()}</title>
</svelte:head>

<Navbar />
<slot />
<Footer />
<Cookies />
