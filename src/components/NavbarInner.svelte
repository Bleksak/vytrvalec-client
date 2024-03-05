<script lang="ts">
	import {  locale, setLocale } from "$translations/i18n-svelte";
	import Button from './Button.svelte';
	import RegistrationForm from './forms/RegistrationForm.svelte';
	import LoginForm from './forms/LoginForm.svelte';
	import LL from '../translations/i18n-svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import SubmissionForm from './forms/SubmissionForm.svelte';
	import { getAllContexts, getContext } from 'svelte';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import { detectLocale } from "$translations/i18n-util";

	const dialogStore = getContext<DialogStore>('dialogStore');
	const context = getAllContexts();
	let currentLocale = $state(detectLocale());

	const handleChange = () => {
		const selectedLocale = currentLocale === 'cs' ? 'en' : 'cs';
		currentLocale = selectedLocale;
		setLocale(selectedLocale);
	}
	
</script>

<button on:click={handleChange}>
	<img src={currentLocale === 'cs' ? "/images/lang/cs.svg": "/images/lang/en.svg"} alt={currentLocale}/>
</button>

{#if $page.data.user && $page.data.user.roles.includes('ROLE_STAFF')}
	<li>
		<a href="/administration">
			{$LL.navbar.administration()}
		</a>
	</li>
{/if}
<li>
	<a href="/{$page.data.lang}/rules">
		{$LL.navbar.rules()}
	</a>
</li>
<li>
	<a href="/{$page.data.lang}/results">
		{$LL.navbar.results()}
	</a>
</li>
{#if !$page.data.user}
	<li>
		<Button class="nav-button" onclick={() => dialogStore.open(LoginForm, {}, context)}>
			{$LL.navbar.login()}
		</Button>
	</li>
	<li>
		<Button
			on:click={() => dialogStore.open(RegistrationForm, {}, context)}
			class="secondary nav-button"
		>
			{$LL.navbar.register()}
		</Button>
	</li>
{:else}
	<li>
		<a href="/{$page.data.lang}/profile">
			{$LL.navbar.profile()}
		</a>
	</li>
	{#if $page.data.currentSeason}
		<li>
			<Button class="nav-button" on:click={() => dialogStore.open(SubmissionForm, {}, context)}>
				{$LL.navbar.submission()}
			</Button>
		</li>
	{/if}
	<li>
		<form method="POST" action="/auth?/logout" use:enhance>
			<Button type="submit" class="secondary nav-button">
				{$LL.navbar.logout()}
			</Button>
		</form>
	</li>
{/if}

<style>
	img {
		width: 30px;
		aspect-ratio: 1/1;
		object-fit: cover;
		border-radius: 50%;
		
	}
	@media (max-width: 1200px) {
		li {
			text-align: center;
		}

		a:not(:has(button)) {
			padding: 10px;
		}

		a {
			display: block;
		}

		a:not(:has(.nav-button)):hover {
			background-color: rgb(200, 200, 200);
		}

		.nav-button:not(.hamburger) {
			margin: 0 auto;
			width: 50%;
		}
	}
</style>
