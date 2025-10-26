<script lang="ts">
	import type { UserResponse } from '$lib/DTO/UserResponse';
	import UserEditor from '$components/administration/user/UserEditor.svelte';
	import { getAllContexts, getContext } from 'svelte';
	import type { UserStore } from '$lib/stores/UserStore.svelte';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import Store from '$lib/enums/Stores';
	import { UserRole } from '$lib/DTO/UserRole';
	import { Pencil } from '@lucide/svelte';
	import Heading from '$components/Heading.svelte';

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
				user.faculty.name.cs.toLowerCase().removeAccents().includes(withoutAccents) ||
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

<article>
	<Heading>
		<h1>Správa uživatelů</h1>
	</Heading>

	<main>
		<input
			placeholder="Vyhledat uživatele (dle jména, e-mailu, či fakulty)"
			type="text"
			bind:value={filterText}
		/>

		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th scope="col">Jméno</th>
						<th scope="col">Příjmení</th>
						<th scope="col">E-mail</th>
						<th scope="col">Fakulta</th>
						<th scope="col">Zablokován</th>
						<th scope="col">Administrátor</th>
						<th scope="col">Akce</th>
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
								<input type="checkbox" id="banned-view" checked={user.banned} disabled />
							</td>
							<td>
								<input
									type="checkbox"
									id="admin-view"
									name="admin-view"
									checked={user.roles.includes(UserRole.Staff)}
									disabled
								/>
							</td>
							<td>
								<button onclick={() => dialogStore.open(UserEditor, { user: user }, context)}>
									<Pencil />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</main>
</article>

