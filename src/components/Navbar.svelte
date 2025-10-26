<script lang="ts">
	import LL, { setLocale } from '$translations/i18n-svelte';
	import { getAllContexts, getContext } from 'svelte';
	import LoginForm from './forms/LoginForm.svelte';
	import RegistrationForm from './forms/RegistrationForm.svelte';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import Store from '$lib/enums/Stores';
	import { detectLocale } from '$translations/i18n-util';
	import SubmissionForm from './forms/SubmissionForm.svelte';
	import { enhance } from '$app/forms';
	import { MenuIcon } from '@lucide/svelte';
	import { getLocale } from '$paraglide/runtime';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import { UserRole } from '$lib/DTO/UserRole';
	import { slide } from 'svelte/transition';

	const { currentSeason, user }: { currentSeason: SeasonDTO | null; user: UserResponse | null } =
		$props();

	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);
	const context = getAllContexts();

	let paraglideLocale = $state(getLocale());
	let currentLocale = $state(detectLocale());

	let menuToggle = $state<HTMLButtonElement>();
	let menuOpened = $state(false);
	let innerWidth = $state(0);

	function handleLocaleChange() {
		const selectedLocale = currentLocale === 'cs' ? 'en' : 'cs';
		currentLocale = selectedLocale;
		setLocale(selectedLocale);
	}

	function toggleMenuOpen() {
		menuOpened = !menuOpened;
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
					<img class="vytrvalec-logo" src="/images/zcu-logo.png" title="Logo ZČU" alt="Logo ZČU" />
				</a>
			</li>
		</ul>
		<button bind:this={menuToggle} class="menu-toggle" onclick={toggleMenuOpen}>
			<MenuIcon />
		</button>
		{#if menuOpened}
			<ul class="menu-content" transition:slide={{ duration: 500 }}>
				<li>
					<button class="locale-change-btn" onclick={handleLocaleChange}>
						<img
							class="locale-flag"
							src={currentLocale === 'cs' ? '/images/lang/cs.svg' : '/images/lang/en.svg'}
							alt={currentLocale}
						/>
					</button>
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
					{#if currentSeason}
						<li>
							<button onclick={() => dialogStore.open(SubmissionForm, {}, context)}>
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
