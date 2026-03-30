<script lang="ts">
    import LL from '$translations/i18n-svelte';
    import { getAllContexts, getContext, onMount } from 'svelte';
    import LoginForm from './forms/LoginForm.svelte';
    import RegistrationForm from './forms/RegistrationForm.svelte';
    import type { DialogStore } from '$lib/stores/DialogStore.svelte';
    import Store from '$lib/enums/Stores';
    import SubmissionForm from './forms/SubmissionForm.svelte';
    import { enhance } from '$app/forms';
    import { MenuIcon } from '@lucide/svelte';
    import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
    import type { UserResponse } from '$lib/DTO/UserResponse';
    import { UserRole } from '$lib/DTO/UserRole';
    import { slide } from 'svelte/transition';
    import type { AxiosInstance } from 'axios';
    import Locale from './Locale.svelte';

    const {
        currentSeason,
        user,
        api,
        locale,
    }: { currentSeason: SeasonDTO | null; user: UserResponse | null; api: AxiosInstance; locale: Locale | string } =
        $props();

    const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);
    const context = getAllContexts();

    let currentLocale = $derived(locale);

    let menuToggle = $state<HTMLButtonElement>();
    let menuOpened = $state(false);
    let innerWidth = $state(0);

    function toggleMenuOpen() {
        menuOpened = !menuOpened;
    }

    let isMobileDevice = $state(false);

    onMount(() => {
        if (/Android/i.test(navigator.userAgent) || /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            isMobileDevice = true;
        }
    });

    function maybeSlide(node: Element, params: { duration: number } | null) {
        if (!isMobileDevice || !params || !menuToggle?.checkVisibility()) {
            return { duration: 0, css: () => '' };
        }

        return slide(node, params);
    }

    $effect(() => {
        innerWidth;
        if (!menuToggle?.checkVisibility()) {
            menuOpened = true;
        }
    });
</script>

<svelte:window bind:innerWidth />

<header>
    <nav>
        <ul>
            <li>
                <a href="/{currentLocale}" aria-label="Hlavní stránka Měsíčního Vytrvalce">
                    <img
                        class="vytrvalec-logo"
                        src="/images/zcu-logo.png"
                        title="Logo ZČU"
                        alt="Logo ZČU"
                    />
                </a>
            </li>
        </ul>
        <button bind:this={menuToggle} class="menu-toggle" onclick={toggleMenuOpen}>
            <MenuIcon />
        </button>
        {#if menuOpened}
            <ul class="menu-content" transition:maybeSlide={{ duration: 500 }}>
                <li>
                    <Locale {currentLocale} {api}/>
                </li>
                {#if user && user.roles.includes(UserRole.Staff)}
                    <li>
                        <a href="/administration">
                            {$LL.navbar.administration()}
                        </a>
                    </li>
                {/if}
                <li>
                    <a href="/{currentLocale}/rules">
                        {$LL.navbar.rules()}
                    </a>
                </li>
                <li>
                    <a href="/{currentLocale}/results">
                        {$LL.navbar.results()}
                    </a>
                </li>
                {#if !user}
                    <li>
                        <button onclick={() => dialogStore.open(LoginForm, {}, context)}>
                            {$LL.navbar.login()}
                        </button>
                    </li>
                    <li>
                        <button
                            onclick={() => dialogStore.open(RegistrationForm, {}, context)}
                            class="secondary"
                        >
                            {$LL.navbar.register()}
                        </button>
                    </li>
                {:else}
                    <li>
                        <a href="/{currentLocale}/profile">
                            {$LL.navbar.profile()}
                        </a>
                    </li>
                    {#if currentSeason && (!currentSeason.is_test || (currentSeason.is_test && user.roles.includes(UserRole.Staff)))}
                        <li>
                            <button
                                onclick={() => dialogStore.open(SubmissionForm, { api }, context)}
                            >
                                {$LL.navbar.submission()}
                            </button>
                        </li>
                    {/if}
                    <li>
                        <form method="POST" action="/auth?/logout" use:enhance>
                            <input type="submit" class="secondary" value={$LL.navbar.logout()} />
                        </form>
                    </li>
                {/if}
            </ul>
        {/if}
    </nav>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .locale-change-btn {
        background-color: transparent;
        border: none;
        outline: none;
    }

    .vytrvalec-logo {
        height: 80px;
    }

    .locale-flag {
        width: 30px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 50%;
    }

    nav {
        width: 100%;
    }

    .menu-toggle {
        display: none;
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        nav {
            flex-direction: column;
        }

        nav > ul {
            flex-direction: column;
        }
    }
</style>
