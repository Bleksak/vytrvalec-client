<script lang="ts">
	import { fetchFaculties } from '$actions/Faculty';
	import Dialog from '$components/Dialog.svelte';
	import LL from '$translations/i18n-svelte';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import Button from '$components/Button.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	let { user, ...props } = $props<{ user: UserResponse & HTMLDialogAttributes }>();
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

<Dialog bind:this={dialog} {...props}>
	<form method="POST" action="/administration/user/?/update" use:enhance={enhancer}>
		<label for="first_name">
			{$LL.registration.first_name()}:
			<input value={user?.firstName} type="text" name="first_name" id="first_name" />
		</label>

		<label for="last_name">
			{$LL.registration.last_name()}:
			<input value={user?.lastName} type="text" name="last_name" id="last_name" />
		</label>

		<label for="email">
			{$LL.registration.email()}:
			<input value={user?.email} type="email" name="email" id="email" />
		</label>

		<label for="faculty">
			{$LL.registration.faculty()}:
			<select value={user?.faculty.id} name="faculty" id="faculty">
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
			<input checked={user?.banned} value="1" type="checkbox" name="banned" id="banned" />
		</label>

		<label for="admin">
			Administrátor:
			<input
				checked={user?.roles.includes('ROLE_STAFF')}
				value="1"
				type="checkbox"
				name="admin"
				id="admin"
			/>
		</label>

		<Button class="full-width">Upravit</Button>
	</form>
</Dialog>
