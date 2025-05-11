<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import { enhance } from '$app/forms';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import type { ConsentError } from '$lib/DTO/ConsentChangeDTO';

	let {
		anonymize
	}: HTMLDialogAttributes & {
		anonymize?: boolean;
	} = $props();

	let errors = $state<ConsentError>();
	let dialog = $state<Dialog>();

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				invalidateAll();
				dialog?.close();
			} else if (result.type === 'failure') {
				errors = result.data as ConsentError;
			}
			update();
		};
	};
</script>

<Dialog bind:this={dialog} header={$LL.anonym.title()}>
	<form
		method="POST"
		action="/auth?/anonymize"
		use:enhance={enhancer}
		name="anonymize"
		onsubmit={invalidateAll}
	>
		<span>
			{$LL.anonym.description1()}
		</span>
		<span>
			{$LL.anonym.description2()}
		</span>
		<span>
			{$LL.anonym.description3()}
		</span>

		<div class="form-field">
			<Checkbox id="anonymize" name="anonymize" checked={anonymize}>
				{$LL.anonym.label()}
			</Checkbox>
			{#each errors?.anonymize ?? [] as error}
				<span class="error">
					{$LL.registration.errors.gdpr[error as keyof typeof $LL.registration.errors.gdpr]()}
				</span>
			{/each}
		</div>
		<Button type="submit">
			{$LL.anonym.submit()}
		</Button>
	</form>
</Dialog>
