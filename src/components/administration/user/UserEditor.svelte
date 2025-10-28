<script lang="ts">
	import Dialog from '$components/Dialog.svelte';
	import LL from '$translations/i18n-svelte';
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import type { UserStore } from '$lib/stores/UserStore.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { UserError } from '$lib/DTO/UserEditDTO';
	import Store from '$lib/enums/Stores';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import { UserRole } from '$lib/DTO/UserRole';

	const { user, ...props }: { user: UserResponse } & HTMLDialogAttributes = $props();
	let dialog = $state<Dialog>();

	let editedUser = $state({ ...user });

	const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);
	const userStore = getContext<UserStore>(Store.USER_STORE);
	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	let adminChecked = $state<boolean>(editedUser.roles.includes(UserRole.Staff));
	let banned = $state<boolean>(editedUser.banned);

	let facultyId = $state<number>(editedUser.faculty.id);
	let errors = $state<UserError>();

	const enhancer: SubmitFunction = () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				dialog?.close();

				editedUser.roles = adminChecked ? [UserRole.User, UserRole.Staff] : [UserRole.User];
				editedUser.faculty = facultyStore.get(facultyId)!;
				editedUser.banned = banned;

				userStore.update(editedUser);

				toastStore.add({
					type: 'success',
					message: 'Uživatel byl úspěšně upraven'
				});
				errors = undefined;
			} else if (result.type === 'failure') {
				errors = result?.data?.errors as UserError;
				toastStore.add({
					type: 'error',
					message: 'Nastala chyba při úpravě uživatele'
				});
			}
			update();
		};
	};
</script>

<Dialog header="Úprava uživatele" bind:this={dialog} {...props}>
	<form method="POST" action="/administration/user?/update" use:enhance={enhancer}>
		<input type="hidden" name="id" value={editedUser.id} />
		<label for="first_name">
			{$LL.registration.first_name()}:
		</label>
		<input bind:value={editedUser.first_name} type="text" name="first_name" id="first_name" />
		{#each errors?.first_name ?? [] as error}
			<span class="error">
				{$LL.registration.errors.first_name[
					error as keyof typeof $LL.registration.errors.first_name
				]()}
			</span>
		{/each}

		<label for="last_name">
			{$LL.registration.last_name()}:
		</label>
		<input bind:value={editedUser.last_name} type="text" name="last_name" id="last_name" />
		{#each errors?.last_name ?? [] as error}
			<span class="error">
				{$LL.registration.errors.last_name[
					error as keyof typeof $LL.registration.errors.last_name
				]()}
			</span>
		{/each}

		<label for="email">
			{$LL.registration.email()}:
		</label>
		<input bind:value={editedUser.email} type="email" name="email" id="email" />
		{#each errors?.email ?? [] as error}
			<span class="error">
				{$LL.registration.errors.email[error as keyof typeof $LL.registration.errors.email]()}
			</span>
		{/each}

		<label for="faculty_id">
			{$LL.registration.faculty()}:
		</label>
		{#each errors?.faculty_id ?? [] as error}
			<span class="error">
				{$LL.registration.errors.faculty[error as keyof typeof $LL.registration.errors.faculty]()}
			</span>
		{/each}

		{#await facultyStore.promise() then faculties}
			<select bind:value={facultyId} name="faculty_id" id="faculty_id">
				{#each faculties as faculty}
					<option value={faculty.id}>{faculty.name.cs}</option>
				{/each}
			</select>
		{:catch}
			<span class="note">Nebylo možné získat fakulty</span>
		{/await}

		<label for="banned">
			<input type="checkbox" id="banned" name="banned" bind:checked={banned} />
			Zablokovaný
		</label>

		<label for="admin">
			<input type="checkbox" id="admin" name="admin" bind:checked={adminChecked} />
			Administrátor
		</label>

		<button>Upravit</button>
	</form>
</Dialog>
