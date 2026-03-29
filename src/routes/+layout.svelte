<script lang="ts">
    import '$css/app.scss';
    import '$lib/DTO/CommonArkType';
    import Store from '$lib/enums/Stores';
    import createActivityStore from '$lib/stores/ActivityStore.svelte';
    import createDialogStore from '$lib/stores/DialogStore.svelte';
    import createFacultyStore from '$lib/stores/FacultyStore.svelte';
    import { createToastStore } from '$lib/stores/ToastStore.svelte';
    import { getAllContexts, setContext } from 'svelte';
    import { locales, localizeHref } from '$paraglide/runtime';
    import { page } from '$app/state';
    import ToastAnchor from '$components/ToastAnchor.svelte';
    import Onboarding from '$components/Onboarding.svelte';

    let { children, data } = $props();

    String.prototype.removeAccents = function () {
        return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const dialogStore = createDialogStore();
    const toastStore = createToastStore();
    const activityStore = $derived(createActivityStore(data.api));
    const facultyStore = $derived(createFacultyStore(data.api));

    const context = getAllContexts();

    setContext(Store.TOAST_STORE, toastStore);
    setContext(Store.DIALOG_STORE, dialogStore);
    setContext(Store.ACTIVITY_STORE, activityStore);
    setContext(Store.FACULTY_STORE, facultyStore);

    $effect(() => {
        if (
            data.user &&
            (data.onboardingDone?.status !== 'completed' ||
                data.onboardingDone?.season !== data.currentSeason?.id)
        ) {
            dialogStore.open(Onboarding, { currentSeason: data.currentSeason }, context);
        }
    });
</script>

<ToastAnchor {toastStore} />

{@render children()}

<div style="display:none">
    {#each locales as locale}
        <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
    {/each}
</div>
