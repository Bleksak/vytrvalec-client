<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import { enhance } from '$app/forms';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import type { ConsentError } from '$lib/DTO/ConsentChangeDTO';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let {
		gdpr,
		...props
	}: HTMLDialogAttributes & {
		gdpr?: boolean;
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

<Dialog bind:this={dialog} header={$LL.gdpr.title()}>
	<form
		method="POST"
		action="/auth?/consent"
		use:enhance={enhancer}
		name="gdpr"
		onsubmit={invalidateAll}
	>
		<span>
			{$LL.gdpr.description1()}
		</span>
		<span>
			{$LL.gdpr.description2()}
		</span>
		<span>
			{$LL.gdpr.description3()}
		</span>

		<div class="form-field">
			<Checkbox id="gdpr" name="gdpr" checked={gdpr}>
				{$LL.registration.gdpr()}
			</Checkbox>
			{#each errors?.gdpr ?? [] as error}
				<span class="error">
					{$LL.registration.errors.gdpr[error as keyof typeof $LL.registration.errors.gdpr]()}
				</span>
			{/each}
		</div>
		<Button type="submit" class="middle rounded">
			{$LL.gdpr.submit()}
		</Button>
	</form>
</Dialog>
