<script lang="ts">
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';
	import { enhance } from '$app/forms';
	import LL from '$translations/i18n-svelte';
	import { fetchFaculties } from '$actions/Faculty';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import Select from '$components/FormComponent/Select.svelte';
	import type { RegistrationError } from '$lib/DTO/UserRegisterResponse';
	import { getContext } from 'svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';

	const toastStore = getContext<ToastStore>('toastStore');

	let { ...props }: HTMLDialogAttributes = $props();
	let dialog = $state<Dialog>();

	let facultiesPromise = fetchFaculties();

	let errors = $state<RegistrationError>();

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toastStore.add({
					type: 'success',
					message: 'Registrace proběhla úspěšně'
				});
				errors = undefined;
				dialog?.close();
			} else if (result.type === 'failure') {
				errors = result?.data?.register as RegistrationError;
				console.log('result?.data :>> ', result?.data);
				toastStore.add({
					type: 'error',
					message: 'Registrace nebyla úspěšná'
				});
			}
		};
	};
</script>

<Dialog bind:this={dialog} header={$LL.registration.title()} {...props}>
	<form method="POST" action="/auth?/register" use:enhance={enhancer}>
		<div class="form-field">
			<label for="faculty">
				{$LL.registration.faculty()}:
			</label>
			{#await facultiesPromise then faculties}
				<Select
					name="faculty"
					id="faculty"
					keys={faculties.map((f) => $LL.faculties[f.shortcut as keyof typeof $LL.faculties]())}
					values={faculties.map((f) => f.id)}
				/>
			{:catch}
				<span class="note">{$LL.registration.errors.faculty.no_faculties()}</span>
			{/await}
			{#each errors?.faculty ?? [] as error}
				<span class="error">
					{$LL.registration.errors.faculty[error as keyof typeof $LL.registration.errors.faculty]()}
				</span>
			{/each}
		</div>

		<div class="form-field">
			<label for="email">
				{$LL.registration.email()}:
			</label>
			<input type="email" name="email" id="email" />
			{#each errors?.email ?? [] as error}
				<span class="error">
					{$LL.registration.errors.email[error as keyof typeof $LL.registration.errors.email]()}
				</span>
			{/each}
		</div>

		<div class="form-field">
			<label for="password">
				{$LL.registration.password()}:
			</label>
			<input type="password" name="password" id="password" />
			{#each errors?.password ?? [] as error}
				<span class="error">
					{$LL.registration.errors.password[error as keyof typeof $LL.registration.errors.password]()}
				</span>
			{/each}
		</div>

		<div class="form-field">
			<label for="first_name">
				{$LL.registration.first_name()}:
			</label>
			<input type="text" name="first_name" id="first_name" />
			{#each errors?.first_name ?? [] as error}
				<span class="error">
					{$LL.registration.errors.first_name[error as keyof typeof $LL.registration.errors.first_name]()}
				</span>
			{/each}
		</div>

		<div class="form-field">
			<label for="last_name">
				{$LL.registration.last_name()}:
			</label>
			<input type="text" name="last_name" id="last_name" />
			{#each errors?.last_name ?? [] as error}
				<span class="error">
					{$LL.registration.errors.last_name[error as keyof typeof $LL.registration.errors.last_name]()}
				</span>
			{/each}
		</div>

		<div class="form-field">
			<Checkbox id="gdpr" name="gdpr">
				{$LL.registration.gdpr()}
			</Checkbox>
			{#each errors?.gdpr ?? [] as error}
				<span class="error">
					{$LL.registration.errors.gdpr[error as keyof typeof $LL.registration.errors.gdpr]()}
				</span>
			{/each}
		</div>
		<Button class="middle">{$LL.registration.submit()}</Button>
	</form>
</Dialog>
