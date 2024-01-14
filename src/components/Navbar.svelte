<script lang="ts">
	import Button from './Button.svelte';
	import RegistrationForm from './forms/RegistrationForm.svelte';
	import LoginForm from './forms/LoginForm.svelte';
	import LL from '../translations/i18n-svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import SubmissionPostForm from './forms/SubmissionPostForm.svelte';

	let currentForm = $state<ConstructorOfATypedSvelteComponent>();
</script>

<nav>
	<ul>
		<li>
			<a href="/{$page.data.lang}">
				<img src="/images/zcu-logo.png" title="Logo ZČU" alt="Logo ZČU" />
			</a>
		</li>
	</ul>
	<ul>
		{#if $page.data.user}
			{#if $page.data.user.roles.includes('ROLE_STAFF')}
				<li>
					<a href="/administration">
						{$LL.navbar.administration()}
					</a>
				</li>
			{/if}
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
					class="secondary"
				>
					{$LL.navbar.register()}
				</Button>
			</li>
		{:else}
			<li>
				<Button
					on:click={() => {
						currentForm = SubmissionPostForm;
					}}
				>
					{$LL.navbar.submission()}
				</Button>
			</li>
			<li>
				<form method="POST" action="/auth/?/logout" use:enhance>
					<Button class="secondary">
						{$LL.navbar.logout()}
					</Button>
				</form>
			</li>
		{/if}
	</ul>
</nav>

<svelte:component
	this={currentForm}
	on:close={() => {
		currentForm = undefined;
	}}
/>

<style>
	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		padding: 10px 100px;
		font-size: 1.3rem;
	}

	nav > ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		gap: 18px;
	}

	nav img {
		height: 80px;
	}
</style>
