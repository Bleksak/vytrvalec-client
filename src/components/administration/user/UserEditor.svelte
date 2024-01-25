<script lang="ts">
	import { fetchFaculties } from '$actions/Faculty';
	import Dialog from '$components/Dialog.svelte';
	import LL from '$translations/i18n-svelte';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import Button from '$components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import type { UserStore } from '$lib/stores/UserStore.svelte';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import Select from '$components/FormComponent/Select.svelte';

	const { user, ...props } = $props<{ user: UserResponse & HTMLDialogAttributes }>();
	let dialog = $state<Dialog>();
	let facultiesPromise = fetchFaculties();

	let editedUser = { ...user };

	const userStore = getContext<UserStore>('userStore');

	let adminChecked = $state<boolean>(editedUser.roles.includes('ROLE_STAFF'));
	let faculty = $state<number>(editedUser.faculty.id);

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				dialog?.close();

				editedUser.roles = adminChecked ? ['ROLE_USER', 'ROLE_STAFF'] : ['ROLE_USER'];
				facultiesPromise.then((faculties) => {
					editedUser.faculty = faculties.find((f) => f.id == faculty) ?? faculties[0];
					userStore.update(editedUser);
				});
			}

			update();
		};
	};
</script>

<Dialog header="Úprava uživatele" bind:this={dialog} {...props}>
	<form method="POST" action="/administration/user/?/update" use:enhance={enhancer}>
		<label for="first_name">
			{$LL.registration.first_name()}:
		</label>
		<input bind:value={editedUser.firstName} type="text" name="first_name" id="first_name" />

		<label for="last_name">
			{$LL.registration.last_name()}:
		</label>
		<input bind:value={editedUser.lastName} type="text" name="last_name" id="last_name" />

		<label for="email">
			{$LL.registration.email()}:
		</label>
		<input bind:value={editedUser.email} type="email" name="email" id="email" />

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
			<span class="note">Nebylo možné získat fakulty</span>
		{/await}

		<Checkbox id="banned" name="banned" checked={editedUser.banned}>Zablokovaný</Checkbox>
		<Checkbox id="admin" name="admin" checked={adminChecked}>Administrátor</Checkbox>

		<Button class="full-width">Upravit</Button>
	</form>
</Dialog>
