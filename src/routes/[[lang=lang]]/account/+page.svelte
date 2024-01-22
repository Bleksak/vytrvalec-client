<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import Button from '$components/Button.svelte';
	import type { AccountChangeErrors } from '$lib/DTO/AccountChangeDTO';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	const currentUser: UserResponse = $page.data.user;

	let password = $state<string>('');
	let oldPassword = $state<string>('');
	let errors = $state<AccountChangeErrors>({});
	let success = $state<boolean>(false);

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				errors = result.data as AccountChangeErrors;
				return;
			}

			success = true;
			password = '';
			oldPassword = '';
		};
	};
</script>

<div>
	<h1>{$LL.account.title()}</h1>

	<form method="post" action="/auth/?/account" use:enhance={enhancer}>
		{#if success}
			<span class="success">{$LL.account.success()}</span>
		{/if}
		<strong>{$LL.account.first_name()}: </strong><span>{currentUser.firstName}</span>
		<strong>{$LL.account.last_name()}: </strong><span>{currentUser.lastName}</span>
		<strong>{$LL.account.faculty()}: </strong><span>{currentUser.faculty.shortcut}</span>

		<label for="email">{$LL.account.email()}: </label>
		{#each errors.email ?? [] as error}
			<span class="error">
				{$LL.account.errors.email[error as keyof typeof $LL.account.errors.email]()}
			</span>
		{/each}
		<input type="email" name="email" id="email" value={currentUser.email} />

		<label for="password">{$LL.account.password()}: </label>
		{#each errors.password ?? [] as error}
			<span class="error">
				{$LL.account.errors.password[error as keyof typeof $LL.account.errors.password]()}
			</span>
		{/each}
		<input type="password" name="password" id="password" bind:value={password} />

		<label for="old_password">{$LL.account.old_password()}: </label>
		{#each errors.old_password ?? [] as error}
			<span class="error">
				{$LL.account.errors.old_password[error as keyof typeof $LL.account.errors.old_password]()}
			</span>
		{/each}
		<input type="password" name="old_password" id="old_password" bind:value={oldPassword} />

		<span class="note">{$LL.account.invalid_info()}</span>
		<Button type="submit">{$LL.account.save()}</Button>
	</form>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		margin-bottom: 40px;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 550px;
		width: 100%;
	}
</style>
