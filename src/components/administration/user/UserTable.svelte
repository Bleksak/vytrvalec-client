<script lang="ts">
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import UserEditor from '$components/administration/user/UserEditor.svelte';
	import { getContext } from 'svelte';
	import type { UserStore } from '$lib/stores/UserStore.svelte';

	const userStore = getContext<UserStore>('userStore');

	const filter = () => {
		return userStore.all().filter((user) => {
			let withoutAccents = filterText.toLocaleLowerCase().removeAccents();

			return (
				user.firstName.toLowerCase().removeAccents().includes(withoutAccents) ||
				user.lastName.toLowerCase().removeAccents().includes(withoutAccents) ||
				user.email.toLowerCase().includes(filterText.toLowerCase().removeAccents()) ||
				user.faculty.shortcut.toLowerCase().includes(filterText.toLowerCase()) ||
				user.faculty.name.toLowerCase().removeAccents().includes(withoutAccents)
			);
		});
	};

	let filterText = $state('');

	let filteredUsers: Array<UserResponse> = $derived(filter());

	let currentUserEditor = $state<ConstructorOfATypedSvelteComponent>();
	let currentUser = $state<number>(-1);

	const openEditor = (userIndex: number) => {
		currentUser = userIndex;
		currentUserEditor = UserEditor;
	};

	const closeEditor = () => {
		currentUser = -1;
		currentUserEditor = undefined;
	};
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
			{#each filteredUsers as user, idx}
				<tr>
					<td>{user.firstName}</td>
					<td>{user.lastName}</td>
					<td>{user.email}</td>
					<td>{user.faculty.shortcut}</td>
					<!--TODO: pridat ikonku banned a role -->
					<td>{user.banned}</td>
					<td>{user.roles.includes('ROLE_STAFF')}</td>
					<td>
						<button class="edit" on:click={() => openEditor(idx)}>
							<img class="icon" src="/images/icons/edit.png" alt="Upravit" title="Upravit" />
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<svelte:component
	this={currentUserEditor}
	on:close={closeEditor}
	user={userStore.all()[currentUser] ?? null}
/>

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
