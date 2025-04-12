<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import type { ForgottenPasswordError } from '$lib/DTO/ForgottenPasswordDTO';
	import Store from '$lib/enums/Stores';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	let { ...props }: HTMLDialogAttributes = $props();
	let dialog = $state<Dialog>();

	let errors = $state<ForgottenPasswordError>();

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	const enhancer: SubmitFunction = ({ submitter }) => {
		submitter?.setAttribute('disabled', 'disabled');

		return async ({ result }) => {
			if (result.type === 'success') {
				dialog?.close();

				toastStore.add({
					type: 'success',
					message: $LL.login.forgotten.success()
				});
			} else if (result.type === 'failure') {
				submitter?.removeAttribute('disabled');
				errors = result.data as ForgottenPasswordError;

				toastStore.add({
					type: 'error',
					message: $LL.login.forgotten.error()
				});
			}
		};
	};
</script>

<Dialog bind:this={dialog} header={$LL.login.forgotten.title()} {...props}>
	<form method="POST" action="/auth?/forgotten" use:enhance={enhancer} name="login">
		<div class="form-field">
			{#if errors}
				<span class="error">
					{$LL.login.forgotten.error()}
				</span>
			{/if}
		</div>
		<input type="hidden" name="lang" value={page.data.lang} />
		<span>{$LL.login.forgotten.description()}</span>

		<div class="form-field">
			<label for="email">
				{$LL.login.email()}:
			</label>
			<input type="email" name="email" id="email" />
		</div>

		<Button>{$LL.login.forgotten.submit()}</Button>
	</form>
</Dialog>
