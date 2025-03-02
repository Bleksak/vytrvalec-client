
<script lang="ts">
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import { enhance } from '$app/forms';
	import LL from '$translations/i18n-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import type { ConsentError } from '$lib/DTO/ConsentChangeDTO';

	let { ...props } : HTMLDialogAttributes = $props();

	let errors = $state<ConsentError>();
	let dialog = $state<Dialog>();

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				dialog?.close();
			} else if (result.type === 'failure') {
				errors = result.data as ConsentError;
			}
			update();
		};
	};

</script>

<Dialog bind:this={dialog} header={$LL.gdpr.title()} {...props}>
	<form method="POST" action="/auth?/consent" use:enhance={enhancer} name="gdpr">
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
            <Checkbox id="gdpr" name="gdpr">
                {$LL.registration.gdpr()}
            </Checkbox>
		</div>
		<Button type="submit" class="middle">
			{$LL.gdpr.submit()}
		</Button>
	</form>
</Dialog>
