<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import Button from './Button.svelte';
	import RegistrationForm from './forms/RegistrationForm.svelte';
	import LoginForm from './forms/LoginForm.svelte';
	import LL from '../translations/i18n-svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import SubmissionPostForm from './forms/SubmissionPostForm.svelte';

	let registrationForm: SvelteComponent;
	let loginForm: SvelteComponent;
	let submissionCreateForm: SvelteComponent;
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
					<a href="/{$page.data.lang}/administration">
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
				<Button on:click={loginForm.open}>
					{$LL.navbar.login()}
				</Button>
			</li>
			<li>
				<Button on:click={registrationForm.open} class="secondary">
					{$LL.navbar.register()}
				</Button>
			</li>
		{:else}
			<li>
				<Button on:click={submissionCreateForm.open}>
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

<RegistrationForm bind:this={registrationForm} />
<LoginForm bind:this={loginForm} />

{#if $page.data.user}
	<SubmissionPostForm bind:this={submissionCreateForm} />
{/if}

<style>
	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		width: 100%;
		padding: 10px 100px;
		margin: 0 auto;
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
