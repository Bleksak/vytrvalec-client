<script lang="ts">
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import { enhance } from '$app/forms';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { LoginError } from '$lib/DTO/UserLoginResponse';
	import { getAllContexts, getContext } from 'svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import ForgottenPasswordForm from './ForgottenPasswordForm.svelte';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import Store from '$lib/enums/Stores';

	let { ...props }: HTMLDialogAttributes = $props();
	let dialog = $state<Dialog>();

	let errors = $state<LoginError>();

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);

	const currentContext = getAllContexts();

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				dialog?.close();
				toastStore.add({
					type: 'success',
					message: $LL.login.success()
				});
			} else if (result.type === 'failure') {
				errors = result.data as LoginError;
				toastStore.add({
					type: 'error',
					message: $LL.login.error()
				});
			}
			update();
		};
	};

	const openForgottenPassword = () => dialogStore.open(ForgottenPasswordForm, {}, currentContext);
</script>

<Dialog bind:this={dialog} header={$LL.login.title()} {...props}>
	<form method="POST" action="/auth?/login" use:enhance={enhancer} name="login">
		<div class="form-field">
			{#each errors?.auth ?? [] as error}
				<span class="error">
					{$LL.login.errors.auth[error as keyof typeof $LL.login.errors.auth]()}
				</span>
			{/each}
		</div>
		<div class="form-field">
			<label for="email">
				{$LL.login.email()}:
			</label>
			<input type="email" name="email" id="email" />
			{#each errors?.email ?? [] as error}
				<span class="error">
					{$LL.login.errors.email[error as keyof typeof $LL.login.errors.email]()}
				</span>
			{/each}
		</div>

		<div class="form-field">
			<label for="password">
				{$LL.login.password()}:
			</label>
			<input type="password" name="password" id="password" />
			{#each errors?.password ?? [] as error}
				<span class="error">
					{$LL.login.errors.password[error as keyof typeof $LL.login.errors.password]()}
				</span>
			{/each}
		</div>

		<button class="forgotten-password" type="button" onclick={openForgottenPassword}>
			{$LL.login.forgotten.prompt()}
		</button>

		<Button type="submit">
			{$LL.login.submit()}
		</Button>
	</form>
</Dialog>

<style>
	.forgotten-password {
		color: #444;
		cursor: pointer;
	}
</style>
