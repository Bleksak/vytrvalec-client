<script lang="ts">
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import LL from '$translations/i18n-svelte';
	import { fetchFaculties } from '$actions/Faculty';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import Select from '$components/FormComponent/Select.svelte';

	let { ...props }: HTMLDialogAttributes = $props();
	let dialog = $state<Dialog>();

	let facultiesPromise = fetchFaculties();

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				dialog?.close();
			}

			update();
		};
	};
</script>

<Dialog bind:this={dialog} header={$LL.registration.title()} {...props}>
	<form method="POST" action="/auth?/register" use:enhance={enhancer}>
		<label for="email">
			{$LL.registration.email()}:
		</label>
		<input type="email" name="email" id="email" />
		{#each $page?.form?.register?.email ?? [] as error}
			<span class="error">
				{$LL.registration.errors.email[error as keyof typeof $LL.registration.errors.email]()}
			</span>
		{/each}

		<label for="password">
			{$LL.registration.password()}:
		</label>
		<input type="password" name="password" id="password" />
		{#each $page?.form?.register?.password ?? [] as error}
			<span class="error">
				{$LL.registration.errors.password[error as keyof typeof $LL.registration.errors.password]()}
			</span>
		{/each}

		<label for="first_name">
			{$LL.registration.first_name()}:
		</label>
		<input type="text" name="first_name" id="first_name" />
		{#each $page?.form?.register?.first_name ?? [] as error}
			<span class="error">
				{$LL.registration.errors.first_name[error as keyof typeof $LL.registration.errors.first_name]()}
			</span>
		{/each}
		<label for="last_name">
			{$LL.registration.last_name()}:
		</label>
		<input type="text" name="last_name" id="last_name" />
		{#each $page?.form?.register?.last_name ?? [] as error}
			<span class="error">
				{$LL.registration.errors.last_name[error as keyof typeof $LL.registration.errors.last_name]()}
			</span>
		{/each}

		<label for="faculty">
			{$LL.registration.faculty()}:
		</label>
		{#await facultiesPromise then faculties}
			<Select
				name="faculty"
				id="faculty"
				keys={faculties.map((f) => f.name)}
				values={faculties.map((f) => f.id)}
			/>
		{:catch}
			<span class="note">{$LL.registration.errors.faculty.no_faculties()}</span>
		{/await}
		{#each $page?.form?.register?.faculty ?? [] as error}
			<span class="error">
				{$LL.registration.errors.faculty[error as keyof typeof $LL.registration.errors.faculty]()}
			</span>
		{/each}

		<Checkbox id="gdpr" name="gdpr">
			{$LL.registration.gdpr()}
		</Checkbox>
		{#each $page?.form?.register?.gdpr ?? [] as error}
			<span class="error">
				{$LL.registration.errors.gdpr[error as keyof typeof $LL.registration.errors.gdpr]()}
			</span>
		{/each}
		<Button class="middle">{$LL.registration.submit()}</Button>
	</form>
</Dialog>
