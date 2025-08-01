<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
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

	let scrollY = $state<number>(0);

	const scrollToTop = () => {
		// NOTE: ve firefoxu nefunguje scrollTo 0, 0, proto tady scrollujeme na 1px a ne na 0
		// treba se to v budoucnu zmeni
		// da se to opravit odstranenim smooth scrollingu, ale bez nej to vypada zvlastne

		scrollY = 1;
	};

	afterNavigate(() => {
		scrollToTop();
	});

	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);
	const context = getAllContexts();
	let currentLocale = $state(detectLocale());

	const handleLocaleChange = () => {
		const selectedLocale = currentLocale === 'cs' ? 'en' : 'cs';
		currentLocale = selectedLocale;
		setLocale(selectedLocale);
	};
</script>

<svelte:window bind:scrollY />

<header>
	<a href="/{page.data.lang}" aria-label="Hlavní stránka Měsíčního Vytrvalce">
		<img class="vytrvalec-logo" src="/images/zcu-logo.png" title="Logo ZČU" alt="Logo ZČU" />
	</a>
	<nav>
		<ul>
			<li>
				<button class="locale-change-btn" onclick={handleLocaleChange}>
					<img
						class="locale-flag"
						src={currentLocale === 'cs' ? '/images/lang/cs.svg' : '/images/lang/en.svg'}
						alt={currentLocale}
					/>
				</button>
			</li>
			{#if page.data.user && page.data.user.roles.includes('ROLE_STAFF')}
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
			{#if !page.data.user}
				<li>
					<button onclick={() => dialogStore.open(LoginForm, {}, context)}>
						{$LL.navbar.login()}
					</button>
				</li>
				<li>
					<button onclick={() => dialogStore.open(RegistrationForm, {}, context)} class="secondary">
						{$LL.navbar.register()}
					</button>
				</li>
			{:else}
				<li>
					<a href="/{currentLocale}/profile">
						{$LL.navbar.profile()}
					</a>
				</li>
				{#if page.data.currentSeason}
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
		<ul>
			<li>
				<!-- TODO: tohle vykreslit jen kdyz je to malej displej -->
				<MenuIcon />
			</li>
		</ul>
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
</style>
