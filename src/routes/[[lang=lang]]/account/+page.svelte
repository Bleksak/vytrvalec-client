<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import Button from '$components/Button.svelte';
	import PasswordProgress from '$components/FormComponent/PasswordProgress.svelte';
	import type { AccountChangeErrors } from '$lib/DTO/AccountChangeDTO';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import { PasswordEstimator } from '$lib/PasswordEstimator';
	import Store from '$lib/enums/Stores';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	const currentUser: UserResponse = $page.data.user;

	let password = $state<string>('');
	let passwordRepeat = $state<string>('');
	let oldPassword = $state<string>('');
	let errors = $state<AccountChangeErrors>({});

	let strength = $state<number>(0);
	
	$effect(() =>{
		strength = PasswordEstimator.estimateStrength(password);
	})

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	const enhancer: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'failure') {
				errors = result.data as AccountChangeErrors;
				return;
			}

			toastStore.add({
				type: 'success',
				message: $LL.account.success()
			});

			password = '';
			passwordRepeat = '';
			oldPassword = '';
		};
	};
</script>

<div class="account-settings">
	<h1>{$LL.account.title()}</h1>

	<form method="post" action="/auth?/account" use:enhance={enhancer}>
		<strong>{$LL.account.first_name()}: </strong><span>{currentUser.firstName}</span>
		<strong>{$LL.account.last_name()}: </strong><span>{currentUser.lastName}</span>
		<strong>{$LL.account.faculty()}: </strong><span>{currentUser.faculty.shortcut}</span>

		<div class="form-field">
			<label for="email">{$LL.account.email()}: </label>
			{#each errors.email ?? [] as error}
				<span class="error">
					{$LL.account.errors.email[error as keyof typeof $LL.account.errors.email]()}
				</span>
			{/each}
			<input type="email" name="email" id="email" value={currentUser.email} />
		</div>

		<div class="form-field">
			<label for="old_password">{$LL.account.old_password()}: </label>
			{#each errors.old_password ?? [] as error}
				<span class="error">
					{$LL.account.errors.old_password[error as keyof typeof $LL.account.errors.old_password]()}
				</span>
			{/each}
			<input type="password" name="old_password" id="old_password" bind:value={oldPassword} />
		</div>

		<div class="form-field">
			<label for="password">{$LL.account.password()}: </label>
			{#each errors.password ?? [] as error}
				<span class="error">
					{$LL.account.errors.password[error as keyof typeof $LL.account.errors.password]()}
				</span>
			{/each}
			<input type="password" name="password" id="password" bind:value={password} />
			<PasswordProgress {strength} />
		</div>

		<div class="form-field">
			<label for="password_repeat">{$LL.account.password_repeat()}: </label>
			{#each errors.password_repeat ?? [] as error}
				<span class="error">
					{$LL.account.errors.password_repeat[error as keyof typeof $LL.account.errors.password_repeat]()}
				</span>
			{/each}
			<input type="password" name="password_repeat" id="password_repeat" bind:value={passwordRepeat}/>
		</div>

		<span class="note">{$LL.account.invalid_info()}</span>
		<Button type="submit">{$LL.account.save()}</Button>
	</form>
</div>

<style>
	.account-settings {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		margin-bottom: 40px;
		padding: 0 30px;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 550px;
		width: 100%;
	}
</style>
