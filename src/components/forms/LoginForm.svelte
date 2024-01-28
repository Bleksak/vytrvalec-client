<script lang="ts">
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	let { ...props } = $props<HTMLDialogAttributes>();
	let dialog = $state<Dialog>();

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				dialog?.close();
			}

			update();
		};
	};
</script>

<Dialog bind:this={dialog} header={$LL.login.title()} {...props}>
	<form method="POST" action="/auth?/login" use:enhance={enhancer} name="login">
		{#each $page?.form?.login ?? [] as error}
			<span class="error">
				{error}
				<!-- TODO: tady musime vyresit jak vypisovat errory typu spatnej login -->
				<!-- {$LL.login.errors.email[error as keyof typeof $LL.login.errors.email]()} -->
			</span>
		{/each}
		<label for="email">
			{$LL.login.email()}:
		</label>
		<input type="email" name="email" id="email" />
		{#each $page?.form?.login?.email ?? [] as error}
			<span class="error">
				{$LL.login.errors.email[error as keyof typeof $LL.login.errors.email]()}
			</span>
		{/each}

		<label for="password">
			{$LL.login.password()}:
		</label>
		<input type="password" name="password" id="password" />
		{#each $page?.form?.login?.password ?? [] as error}
			<span class="error">
				{$LL.login.errors.password[error as keyof typeof $LL.login.errors.password]()}
			</span>
		{/each}

		<Button class="middle">{$LL.login.submit()}</Button>
	</form>
</Dialog>
