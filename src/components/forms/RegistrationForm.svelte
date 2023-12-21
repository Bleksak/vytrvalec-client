<script lang="ts">
	import Button from '../Button.svelte';
	import Dialog from '../Dialog.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import LL from '../../translations/i18n-svelte';
	import type { Faculty } from '$lib/DTO/Faculty';
	import { fetchFaculties } from '$actions/Faculty';

	let dialog: Dialog | any = $state();
	export function open() {
		dialog.showModal();
	}

	let faculties: Array<Faculty> = $state([]);

	$effect(() => {
		fetchFaculties().then((data) => {
			faculties = data;
		});
	});
</script>

<Dialog bind:dialog>
	<div>
		<h5>{$LL.registration.title()}</h5>

		<form method="POST" action="/auth/?/register" use:enhance>
			<label for="email">
				{$LL.registration.email()}:
				<input type="email" name="email" id="email" />
				{#each $page?.form?.register?.email ?? [] as error}
					<span class="error">
						{$LL.registration.errors.email[error as keyof typeof $LL.registration.errors.email]()}
					</span>
				{/each}
			</label>

			<label for="password">
				{$LL.registration.password()}:
				<input type="password" name="password" id="password" />
				{#each $page?.form?.register?.password ?? [] as error}
					<span class="error">
						{$LL.registration.errors.password[error as keyof typeof $LL.registration.errors.password]()}
					</span>
				{/each}
			</label>

			<label for="first_name">
				{$LL.registration.first_name()}:
				<input type="text" name="first_name" id="first_name" />
				{#each $page?.form?.register?.first_name ?? [] as error}
					<span class="error">
						{$LL.registration.errors.first_name[error as keyof typeof $LL.registration.errors.first_name]()}
					</span>
				{/each}
			</label>
			<label for="last_name">
				{$LL.registration.last_name()}:
				<input type="text" name="last_name" id="last_name" />
				{#each $page?.form?.register?.last_name ?? [] as error}
					<span class="error">
						{$LL.registration.errors.last_name[error as keyof typeof $LL.registration.errors.last_name]()}
					</span>
				{/each}
			</label>

			<label for="faculty">
				{$LL.registration.faculty()}:
				<select name="faculty" id="faculty">
					{#each faculties as faculty}
						<option value={faculty.id}>{faculty.name}</option>
					{/each}
				</select>
				{#each $page?.form?.register?.faculty ?? [] as error}
					<span class="error">
						{$LL.registration.errors.faculty[error as keyof typeof $LL.registration.errors.faculty]()}
					</span>
				{/each}
			</label>

			<label for="gdpr">
				<input type="checkbox" name="gdpr" id="gdpr" value="1" />
				<input type="hidden" name="gdpr" value="0" />
				{$LL.registration.gdpr()}:
				<br />
				{#each $page?.form?.register?.gdpr ?? [] as error}
					<span class="error">
						{$LL.registration.errors.gdpr[error as keyof typeof $LL.registration.errors.gdpr]()}
					</span>
				{/each}
			</label>
			<Button class="full-width">{$LL.registration.submit()}</Button>
		</form>
	</div>
</Dialog>

<style>
	div {
		display: flex;
		flex-direction: column;

		align-items: center;
		gap: 20px;
	}
</style>
