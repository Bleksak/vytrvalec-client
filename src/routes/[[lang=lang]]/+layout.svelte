<script lang="ts">
    import { setLocale } from '../../translations/i18n-svelte';
    import { setLocale as setLocaleParaglide } from '$paraglide/runtime';
    import { loadAllLocales } from '../../translations/i18n-util.sync';
    import LL from '$translations/i18n-svelte';
    import type { Locales } from '$translations/i18n-types';
    import Navbar from '$components/Navbar.svelte';
    import Footer from '$components/Footer.svelte';

    let { children, data } = $props();
    const lang = $derived((data.lang as Locales) ?? 'cs');

    loadAllLocales();

    $effect(() => {
        setLocale(lang);
        setLocaleParaglide(lang, { reload: false });
    });
</script>

<svelte:head>
    <title>{$LL.homepage.title()}</title>
</svelte:head>

<Navbar currentSeason={data.currentSeason} user={data.user ?? null} api={data.api} locale={lang}/>
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
