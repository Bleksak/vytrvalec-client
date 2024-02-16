<script lang="ts">
	import { StoreKey } from '$lib/stores/StoreKey';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import LL from '$translations/i18n-svelte';
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';

	const toastStore = getContext<ToastStore>(StoreKey.TOAST_STORE);

	const onSubmit: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toastStore.add({
					type: 'success',
					message: $LL.reset.success()
				});
			} else if (result.type === 'failure') {
				//TODO
				toastStore.add({
					type: 'error',
					message: $LL.reset.error()
				});
			}
			update();
		};
	};
</script>

<main>
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
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: white;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 550px;
		width: 100%;
		margin-bottom: 20px;
	}
</style>
