<script lang="ts">
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import UserEditor from '$components/administration/user/UserEditor.svelte';
	import { getAllContexts, getContext } from 'svelte';
	import type { UserStore } from '$lib/stores/UserStore.svelte';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import Store from '$lib/enums/Stores';
	import { UserRole } from '$lib/DTO/UserRole';

	const userStore = getContext<UserStore>(Store.USER_STORE);
	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);

	const context = getAllContexts();

	const filter = () => {
		return userStore.all().filter((user) => {
			let withoutAccents = filterText.toLocaleLowerCase().removeAccents();

			return (
				user.first_name.toLowerCase().removeAccents().includes(withoutAccents) ||
				user.last_name.toLowerCase().removeAccents().includes(withoutAccents) ||
				user.email.toLowerCase().includes(filterText.toLowerCase().removeAccents()) ||
				user.faculty.shortcut.toLowerCase().includes(filterText.toLowerCase()) ||
				user.faculty.name.toLowerCase().removeAccents().includes(withoutAccents) ||
				(
					user.first_name.toLowerCase().removeAccents() +
					' ' +
					user.last_name.toLowerCase().removeAccents()
				).includes(withoutAccents)
			);
		});
	};

	let filterText = $state('');

	let filteredUsers: Array<UserResponse> = $derived(filter());
</script>

<div class="wrapper">
	<h2>Správa uživatelů</h2>

	<input
		placeholder="Vyhledat uživatele (dle jména, e-mailu, či fakulty)"
		type="text"
		bind:value={filterText}
	/>

	<table>
		<thead>
			<tr>
				<th>Jméno</th>
				<th>Příjmení</th>
				<th>E-mail</th>
				<th>Fakulta</th>
				<th>Zablokován</th>
				<th>Administrátor</th>
				<th>Upravit</th>
			</tr>
		</thead>

		<tbody>
			{#each filteredUsers as user}
				<tr>
					<td>{user.first_name}</td>
					<td>{user.last_name}</td>
					<td>{user.email}</td>
					<td>{user.faculty.shortcut}</td>
					<td>
						<Checkbox id="banned-view" name="banned-view" checked={user.banned} disabled />
					</td>
					<td>
						<Checkbox
							id="admin-view"
							name="admin-view"
							checked={user.roles.includes(UserRole.Staff)}
							disabled
						/>
					</td>
					<td>
						<button
							class="edit"
							onclick={() => dialogStore.open(UserEditor, { user: user }, context)}
						>
							<img class="icon" src="/images/icons/edit.png" alt="Upravit" title="Upravit" />
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	input {
		width: 80%;
	}

	table {
		width: 80%;
		font-size: 1.2rem;
	}

	th {
		font-weight: 500;
	}

	thead > tr {
		border-bottom: 1px solid black;
	}

	tbody > tr:nth-child(odd) {
		background-color: #f2f2f2;
	}

	td {
		vertical-align: middle;
	}

	.edit {
		cursor: pointer;
	}
</style>
