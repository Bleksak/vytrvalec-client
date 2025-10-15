<script lang="ts">
	import { emailSubscribeChange } from '$actions/Auth';
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Button from '$components/Button.svelte';
	import PasswordProgress from '$components/FormComponent/PasswordProgress.svelte';
	import Switch from '$components/Switch.svelte';
	import DeleteAccountForm from '$components/forms/DeleteAccountForm.svelte';
	import AnonymizationForm from '$components/forms/AnonymizationForm.svelte';
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
	import Heading from '$components/Heading.svelte';

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

	const openAnonymizationDialog = () =>
		dialogStore.open(
			AnonymizationForm,
			{ anonymize: currentUser.anonymize ? currentUser.anonymize : undefined },
			context
		);

	const openDeleteAccDialog = () => dialogStore.open(DeleteAccountForm, {}, context);

	const handleSubscribtionChange = async (
		event: Event & { currentTarget: EventTarget & HTMLInputElement }
	) => {
		event.preventDefault();

		const response = await emailSubscribeChange(event.currentTarget.checked);
		if (response.errors) {
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
	};

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

<main>
	<article>
		<Heading>
			<div class="user">
				<h4>{currentUser.first_name} {currentUser.last_name}</h4>
				<FacultyTag facultyShortcut={currentUser.faculty.shortcut} />
			</div>
		</Heading>
		<main>
			<section class="account-info">
				<div class="row">
					<div class="email">
						<strong>{$LL.account.email()}:</strong>
						<span>{currentUser.email}</span>
					</div>

					<div class="mailing">
						<strong>{$LL.account.emailing.description()}:</strong>
						<Switch checked={currentUser.mailing} onChange={handleSubscribtionChange} />
					</div>
				</div>
			</section>
			<section class="form-section">
				<form method="post" action="/auth?/account" use:enhance={enhancer}>
					<h5>{$LL.account.password_change()}</h5>
					<div class="form-field">
						<label for="old_password">{$LL.account.old_password()}: </label>
						{#each errors.old_password ?? [] as error}
							<span class="error">
								{$LL.account.errors.old_password[
									error as keyof typeof $LL.account.errors.old_password
								]()}
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
					<div>
						<span class="note">{$LL.account.invalid_info()}</span>
					</div>
					<div class="submit-row">
						<Button type="submit">{$LL.account.save()}</Button>
					</div>
				</form>
			</section>
		</main>
		<section class="card danger-zone">
			<h3>{$LL.account.danger_zone()}</h3>
			<div class="actions">
				<Button onclick={openAnonymizationDialog}>{$LL.anonym.title()}</Button>
				<Button onclick={openDeleteAccDialog} class="danger">
					{$LL.account.delete.title()}
				</Button>
			</div>
		</section>
	</article>
</main>

<style>
	.user {
		display: flex;
		align-items: center; 
		gap: 0.5rem;        
	}
	.user h4 {
		margin: 0;        
	}
	.account-info .row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;
	}
	.email {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	.mailing {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		white-space: nowrap;
	}
	.danger-zone {
		border: 1px solid #e74c3c;
		background: #fff5f5;
		color: #b00020;
	}
	.danger-zone {
		border: 2px dashed #e74c3c;
		border-radius: 8px;
		padding: 1rem;
		background: #e74c3c1a;
		color: #e74c3c;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.danger-zone h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: inherit;
	}

	.actions {
		display: flex;
		gap: 1rem;
	}

	.form-section {
		border-top: 1px solid #005cab1a; 
		margin-top: 1rem;
		padding-top: 1rem;
	}
	.submit-row {
		display: flex;
		justify-content: center;
		margin-top: 1rem;
	}
</style>
