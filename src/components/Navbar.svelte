<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import Button from './Button.svelte';
	import RegistrationForm from './forms/RegistrationForm.svelte';
	import LoginForm from './forms/LoginForm.svelte';
	import LL from '../translations/i18n-svelte';
	import { page } from '$app/stores';

	let registrationForm: SvelteComponent;
	let loginForm: SvelteComponent;
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
		<li>
			<a href="/{$page.data.lang}/rules">{$LL.navbar.rules()}</a>
		</li>
		<li>
			<a href="/{$page.data.lang}/results">{$LL.navbar.results()}</a>
		</li>
		<li>
			<Button on:click={loginForm.open}>{$LL.navbar.login()}</Button>
		</li>
		<li>
			<Button on:click={registrationForm.open} class="secondary">{$LL.navbar.register()}</Button>
		</li>
	</ul>
</nav>

<RegistrationForm bind:this={registrationForm} />
<LoginForm bind:this={loginForm} />

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
