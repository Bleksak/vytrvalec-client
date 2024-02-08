<script lang="ts">
	import Button from './Button.svelte';
	import RegistrationForm from './forms/RegistrationForm.svelte';
	import LoginForm from './forms/LoginForm.svelte';
	import LL from '../translations/i18n-svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import SubmissionForm from './forms/SubmissionForm.svelte';

	let currentForm = $state<ConstructorOfATypedSvelteComponent>();
</script>

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
		<Button
			class="nav-button"
			on:click={() => {
				currentForm = LoginForm;
			}}
		>
			{$LL.navbar.login()}
		</Button>
	</li>
	<li>
		<Button
			on:click={() => {
				currentForm = RegistrationForm;
			}}
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
	<li>
		<a href="/{$page.data.lang}/account">
			<Button class="nav-button">
				{$LL.navbar.settings()}
			</Button>
		</a>
	</li>
	<li>
		<Button
			class="nav-button"
			on:click={() => {
				currentForm = SubmissionForm;
			}}
		>
			{$LL.navbar.submission()}
		</Button>
	</li>
	<li>
		<form method="POST" action="/auth?/logout" use:enhance>
			<Button class="secondary nav-button">
				{$LL.navbar.logout()}
			</Button>
		</form>
	</li>
{/if}

<svelte:component
	this={currentForm}
	on:close={() => {
		currentForm = undefined;
	}}
/>

<style>
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
