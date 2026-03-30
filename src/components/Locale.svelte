<script lang="ts">
    import { localeChange } from '$actions/Auth';
    import { LOCALES } from '$lib/DTO/LanguageDTO';
    import { locales, setLocale as setLocaleParaglide, type Locale } from '$paraglide/runtime';
    import { setLocale } from '$translations/i18n-svelte';
    import type { AxiosInstance } from 'axios';

    let { currentLocale, api }: { currentLocale: Locale; api: AxiosInstance } = $props();

    const handleLocaleChange = async (event: Event) => {
        const selectedLocale = (event.target as HTMLSelectElement).value as Locale;
        setLocale(selectedLocale);
        setLocaleParaglide(selectedLocale, { reload: true });
        currentLocale = selectedLocale;
        await localeChange(currentLocale, api);
    };
</script>

<select
    onchange={handleLocaleChange}
    bind:value={currentLocale}
    name="locale"
    aria-label="locale"
    class="locale-select"
>
    {#each locales as locale}
        <option value={locale}>
            {LOCALES[locale].flag}
            {LOCALES[locale].name}
        </option>
    {/each}
</select>

<style>
    .locale-select {
        min-width: 165px;
    }
</style>
