<script lang="ts">
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import LL from '$translations/i18n-svelte';
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import { goto } from '$app/navigation';

	const toastStore = getContext<ToastStore>('toastStore');

    let errors = $state();

	const onSubmit: SubmitFunction = ({submitter}) => {
        submitter?.setAttribute('disabled', 'disabled');
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toastStore.add({
					type: 'success',
					message: $LL.reset.success()
				});

                goto('/');
			} else if (result.type === 'failure') {
                submitter?.removeAttribute('disabled');
                errors = result.data;

				toastStore.add({
					type: 'error',
					message: $LL.reset.error()
				});
			}
			update();
		};
	};
</script>

<div class="reset-password">
	<header>
		<h3>{$LL.reset.title()}</h3>
	</header>

	<form method="POST" action="/auth?/reset" use:enhance={onSubmit} name="reset">
		<label for="password">
			{$LL.reset.password()}:
		</label>
		<input type="password" name="password" id="password" />

		<label for="passwordRepeat">
			{$LL.reset.passwordRepeat()}:
		</label>
		<input type="password" name="passwordRepeat" id="passwordRepeat" />

		<Button class="middle">
			{$LL.reset.submit()}
		</Button>
	</form>
</div>

<style>
	.reset-password {
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
