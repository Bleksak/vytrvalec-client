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

<Dialog bind:this={dialog} {...props}>
	<form method="POST" action="/administration/user/?/update" use:enhance={enhancer}>
		<label for="first_name">
			{$LL.registration.first_name()}:
			<input bind:value={editedUser.firstName} type="text" name="first_name" id="first_name" />
		</label>

		<label for="last_name">
			{$LL.registration.last_name()}:
			<input bind:value={editedUser.lastName} type="text" name="last_name" id="last_name" />
		</label>

		<label for="email">
			{$LL.registration.email()}:
			<input bind:value={editedUser.email} type="email" name="email" id="email" />
		</label>

		<label for="faculty">
			{$LL.registration.faculty()}:
			<select bind:value={faculty} name="faculty" id="faculty">
				{#await facultiesPromise then faculties}
					{#each faculties as faculty}
						<option value={faculty.id}>{faculty.name}</option>
					{/each}
				{:catch}
					<option value="-1">Nebylo možné získat fakulty</option>
				{/await}
			</select>
		</label>

		<label for="banned">
			Zablokovaný:
			<input bind:checked={editedUser.banned} value="1" type="checkbox" name="banned" id="banned" />
		</label>

		<label for="admin">
			Administrátor:
			<input bind:checked={adminChecked} value="1" type="checkbox" name="admin" id="admin" />
		</label>

		<Button class="full-width">Upravit</Button>
	</form>
</Dialog>
