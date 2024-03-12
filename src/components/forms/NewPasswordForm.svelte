<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import type { ResetError } from '$lib/DTO/ResetPasswordDTO';
    import { page } from '$app/stores'
	import Store from '$lib/enums/Stores';

    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
    const resetPasswordToken = $page.url.pathname.split('/reset-password/')[1];

	let errors = $state<ResetError>();

	const onSubmit: SubmitFunction = ({ submitter }) => {
		submitter?.setAttribute('disabled', 'disabled');
		return async ({ result, update }) => {
			// NOTE: dočasně změněn retun na redirect protože mi ro přišlo snažší než 
			// řešit proč goto is not going to
			if (result.type === 'redirect') {
				toastStore.add({
					type: 'success',
					message: $LL.reset.success()
				});
                errors = undefined;
                // FIXME: goto not going to
				// goto('/');
			} else if (result.type === 'failure') {
				submitter?.removeAttribute('disabled');
				errors = result.data as ResetError;
				toastStore.add({
					type: 'error',
					message: $LL.reset.error()
				});
			}
			update();
		};
	};
</script>

<form method="POST" action="/auth?/reset" use:enhance={onSubmit} name="reset">
    <input type='hidden' name='passwordResetToken' value={resetPasswordToken}/>
  {#each errors?.server ?? [] as error} 
        <span class='error' > {$LL.server[error as keyof typeof $LL.server]()}</span>
    {/each}

	<label for="password">
		{$LL.reset.password()}:
	</label>
	<input type="password" name="password" id="password" />

     {#each errors?.password ?? [] as error} 
        <span class='error' > {$LL.reset.errors[error as keyof typeof $LL.reset.errors]()}</span>
    {/each}

    <label for="passwordRepeat">
		{$LL.reset.passwordRepeat()}:
	</label>
	<input type="password" name="passwordRepeat" id="passwordRepeat" />

	<Button class="middle">
		{$LL.reset.submit()}
	</Button>
</form>

<style>
   	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 550px;
		width: 100%;
	}
</style>