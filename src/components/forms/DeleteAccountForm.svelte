<script lang="ts">
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import LL from '$translations/i18n-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResponseError } from '$lib/ResponseErrors';
	import { getContext } from 'svelte';
	import Store from '$lib/enums/Stores';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	let errors = $state<{ server?: Array<ResponseError> }>();
	let dialog = $state<Dialog>();

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'redirect') {
				dialog?.close();
				toastStore.add({
					type: 'success',
					message: $LL.account.delete.success()
				});
			} else if (result.type === 'failure') {
				errors = result.data;
				toastStore.add({
					type: 'error',
					message: $LL.account.delete.error()
				});
			}
			update();
		};
	};
</script>

<Dialog bind:this={dialog} header={$LL.account.delete.title()}>
	<form method="POST" action="/auth?/delete" use:enhance={enhancer} name="accDelete">
		{#each errors?.server ?? [] as error}
			<span class="error">
				{error}
			</span>
		{/each}
		<p><strong>{$LL.account.delete.desc1()}</strong></p>
		<p>{$LL.account.delete.desc2()}</p>
		<p>{$LL.account.delete.desc3()}</p>
		<p>{$LL.account.delete.desc4()}</p>

		<Button type="submit" class="danger">
			{$LL.account.delete.submit()}
		</Button>
	</form>
</Dialog>
