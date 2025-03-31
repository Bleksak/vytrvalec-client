<script lang="ts">
	import { emailSubscribeChange } from '$actions/Auth';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Button from '$components/Button.svelte';
	import PasswordProgress from '$components/FormComponent/PasswordProgress.svelte';
	import Switch from '$components/Switch.svelte';
	import GdprForm from '$components/forms/GdprForm.svelte';
	import FacultyTag from '$components/profile/FacultyTag.svelte';
	import type { AccountChangeErrors } from '$lib/DTO/AccountChangeDTO';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import { PasswordEstimator } from '$lib/PasswordEstimator';
	import Store from '$lib/enums/Stores';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getAllContexts, getContext } from 'svelte';

	const currentUser: UserResponse = $derived(page.data.user);
	const context = getAllContexts();

	let password = $state<string>('');
	let passwordRepeat = $state<string>('');
	let oldPassword = $state<string>('');
	let errors = $state<AccountChangeErrors>({});

	let strength = $state<number>(0);

	$effect(() => {
		strength = PasswordEstimator.estimateStrength(password);
	});

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);

	const openGdprDialog = () =>
		dialogStore.open(GdprForm, { gdpr: currentUser.accepted_gdpr ? currentUser.accepted_gdpr : undefined }, context);


	const handleSubscribtionChange = async (event: Event & { currentTarget: EventTarget & HTMLInputElement; }) => {
		event.preventDefault();

		const response = await emailSubscribeChange(event.currentTarget.checked);
		if(response.errors) {
			toastStore.add({
				type: 'error',
				message: $LL.account.emailing.error()
			});
		} else {
			toastStore.add({
				type: 'success',
				message: $LL.account.emailing.success()
			});
		}
	}

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

<div class="account-settings section">
	<div class="container section">
		<div class="section">
			<div class="user">
				<h4>
					{currentUser.first_name}
					{currentUser.last_name}
				</h4>
				<FacultyTag facultyShortcut={currentUser.faculty.shortcut} />
			</div>
				<strong>{$LL.account.email()}:</strong><span>{` ${currentUser.email}`}</span>
			<div class="mailing">
				<strong>{$LL.account.emailing.description()}: </strong>
				<Switch checked={currentUser.mailing} onChange={handleSubscribtionChange} />
			</div>
			<Button onclick={openGdprDialog} class="rounded">{$LL.gdpr.title()}</Button>	
		</div>
		

		<form method="post" action="/auth?/account" use:enhance={enhancer}>
			<h5>{$LL.account.password_change()}</h5>
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
						{$LL.account.errors.password_repeat[
							error as keyof typeof $LL.account.errors.password_repeat
						]()}
					</span>
				{/each}
				<input
					type="password"
					name="password_repeat"
					id="password_repeat"
					bind:value={passwordRepeat}
				/>
			</div>

			<span class="note">{$LL.account.invalid_info()}</span>
			<Button class="rounded" type="submit">{$LL.account.save()}</Button>
		</form>
	</div>
</div>

<style>
	.account-settings {
		align-items: center;
		justify-content: center;
		margin-bottom: 40px;
		padding: 0 30px;
	}

	.user {
		display: flex;
		gap: 10px;
		align-items: center;
		align-self: flex-start;
	}

	.mailing {
		display: flex;
		align-items: center;
	}

	.section {
		display: flex;
		flex-direction: column;
	}

	.container {
		gap: 50px;
	}
</style>