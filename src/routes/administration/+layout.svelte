<script lang="ts">
    import { setLocale } from '../../translations/i18n-svelte';
    import { loadAllLocales } from '../../translations/i18n-util.sync';
    import { page } from '$app/state';
    import LL from '$translations/i18n-svelte';
    import type { Locales } from '$translations/i18n-types';
    import Navbar from '$components/Navbar.svelte';
    import Footer from '$components/Footer.svelte';
    import { createUserStore } from '$lib/stores/UserStore.svelte';
    import { setContext } from 'svelte';
    import Store from '$lib/enums/Stores';
    import { createToastStore } from '$lib/stores/ToastStore.svelte';
    import ToastAnchor from '$components/ToastAnchor.svelte';

    let { children, data } = $props();
    loadAllLocales();

    const lang = (page.params.lang as Locales) ?? 'cs';
    setLocale(lang);

    const userStore = $derived(createUserStore(data.api));
    const toastStore = createToastStore();

    setContext(Store.USER_STORE, userStore);
    setContext(Store.TOAST_STORE, toastStore);
</script>

<svelte:head>
    <title>{$LL.homepage.title()}</title>
</svelte:head>

<Navbar currentSeason={data.currentSeason} user={data.user ?? null} api={data.api} />

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

<ToastAnchor {toastStore} />

<!-- <Cookies /> -->

<style>
    .grid {
        grid-template-columns: 240px 1fr;
    }
</style>
