<script lang="ts">
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import { enhance } from '$app/forms';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { LoginError } from '$lib/DTO/UserLoginResponse';
	import { getContext } from 'svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { ForgottenPasswordError } from '$lib/DTO/ForgottenPasswordDTO';

	let { ...props } = $props<HTMLDialogAttributes>();
	let dialog = $state<Dialog>();

	let errors = $state<LoginError>();
	let forgottenError = $state<ForgottenPasswordError>();
	let isForgottenPassword = $state<boolean>(false);

	const toastStore = getContext<ToastStore>('toastStore');

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				dialog?.close();
				toastStore.add({
					type: 'success',
					message: isForgottenPassword ? $LL.login.forgotten.success() : $LL.login.success()
				});
			} else if (result.type === 'failure') {
				if (result.data?.login) {
					errors = result.data?.login as LoginError;
				} else {
					forgottenError = result.data?.forgotten as ForgottenPasswordError;
				}
				toastStore.add({
					type: 'error',
					message: isForgottenPassword ? $LL.login.forgotten.error() : $LL.login.error()
				});
			}
			update();
		};
	};
</script>

<Dialog
	bind:this={dialog}
	header={isForgottenPassword ? $LL.login.forgotten.title() : $LL.login.title()}
	{...props}
>
	<form
		method="POST"
		action={isForgottenPassword ? '/auth?/forgotten' : '/auth?/login'}
		use:enhance={enhancer}
		name="login"
	>
		<div class="form-field">
			{#each errors?.auth ?? [] as error}
				<span class="error">
					{$LL.login.errors.auth[error as keyof typeof $LL.login.errors.auth]()}
				</span>
			{/each}
		</div>
		{#if isForgottenPassword}
			<span>{$LL.login.forgotten.description()}</span>
		{/if}

		<div class="form-field">
			<label for="email">
				{$LL.login.email()}:
			</label>
			<input type="email" name="email" id="email" />
			{#if !isForgottenPassword}
				{#each errors?.email ?? [] as error}
					<span class="error">
						{$LL.login.errors.email[error as keyof typeof $LL.login.errors.email]()}
					</span>
				{/each}
			{:else}
				{#each forgottenError?.email ?? [] as error}
					<span class="error">
						<!-- TODO -->
						{$LL.login.errors.email[error as keyof typeof $LL.login.errors.email]()}
					</span>
				{/each}
			{/if}
		</div>
		{#if !isForgottenPassword}
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

			<button type="button" on:click={() => (isForgottenPassword = true)}>
				{$LL.login.forgotten.prompt()}
			</button>
		{/if}

		<Button class="middle">
			{isForgottenPassword ? $LL.login.forgotten.submit() : $LL.login.submit()}
		</Button>
	</form>
</Dialog>

<style>
	button {
		color: gray;
		cursor: pointer;
	}
</style>
