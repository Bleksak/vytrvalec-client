<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import Store from '$lib/enums/Stores';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import type { FacultyDTO, FacultyError } from '$lib/DTO/FacultyDTO';
	import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import Select from '$components/FormComponent/Select.svelte';
	import { LL } from '$translations/i18n-svelte';

	const { faculty }: { faculty?: FacultyDTO } = $props();
	const facultyStore = getContext<FacultyStore>(Store.FACULTY_STORE);
	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	const initFaculty = (faculty: FacultyDTO | undefined): FacultyDTO => {
		return faculty
			? {
					...faculty
				}
			: { id: 0, name: '', shortcut: '', visible: false, parent: null };
	};

	let currentFaculty = $state<FacultyDTO>(initFaculty(faculty));

	$effect(() => {
		currentFaculty = initFaculty(faculty);
	});

	let deleteStatus = $state<boolean>();
	let errors = $state<FacultyError>();

	const removeFaculty = () => {
		if (!faculty) return;
		facultyStore.remove(faculty).then((status) => {
			deleteStatus = status;

			if (deleteStatus) {
				toastStore.add({
					type: 'success',
					message: 'Fakulta odstraněna'
				});
				goto('/administration/faculty');
			} else {
				toastStore.add({
					type: 'error',
					message: 'Nastala chyba při odstranění fakulty'
				});
			}
		});
	};

	const enhancer: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'success') {
				facultyStore.updateOrCreate(result.data?.id ?? currentFaculty.id);
				toastStore.add({
					type: 'success',
					message: faculty ? 'Fakulta byla úspěšně upravena' : 'Fakulta byla úspěšně vytvořena'
				});
				errors = undefined;
			} else if (result.type === 'failure') {
				errors = result?.data?.faculty as FacultyError;
				toastStore.add({
					type: 'error',
					message: faculty
						? 'Nastala chyba při úpravě fakulty'
						: 'Nastala chyba při vytváření fakulty'
				});
			}
		};
	};

	// $effect(() => {
	// 	//@ts-ignore
	// 	currentFaculty = faculty || { name: '', shortcut: '', visible: true, parent: null };
	// });
</script>

<form
	action={faculty
		? `/administration/faculty/${faculty?.id}?/update`
		: '/administration/faculty?/create'}
	method="post"
	use:enhance={enhancer}
>
	<label for="name">Název:</label>
	<input type="text" name="name" id="name" bind:value={currentFaculty.name} />
	{#if errors?.name}
		<span class="error"> Název fakulty nesmí být prázdný </span>
	{/if}

	<label for="shortcut">Zkratka:</label>
	<input type="text" name="shortcut" id="shortcut" bind:value={currentFaculty.shortcut} />
	{#if errors?.shortcut}
		<span class="error"> Zkratka fakulty nesmí být prázdná </span>
	{/if}

	<Checkbox id="visible" name="visible" checked={Boolean(currentFaculty.visible)}>Aktivní</Checkbox>

	<label for="shortcut">Nadřazené pracoviště:</label>
	{#await facultyStore.promise() then faculties}
		{@const keys = [
			'Žádné',
			...faculties.map((f) => $LL.faculties[f.shortcut as keyof typeof $LL.faculties]())
		]}
		{@const values = [null, ...faculties.map((f) => f.id)]}
		<Select name="parent" id="parent" {keys} {values} bind:currentValue={currentFaculty.parent} />
	{:catch}
		<span class="note">Nepodařilo se načíst fakulty</span>
	{/await}
	{#if errors?.parent}
		<span class="error">
			Nelze přiřadit pracoviště pod jiné, které má také nadřazené pracoviště
		</span>
	{/if}

	{#if faculty}
		<div class="buttons">
			<Button type="submit">Upravit</Button>
			<Button type="button" onclick={removeFaculty} class="danger">Odstranit</Button>
		</div>
	{:else}
		<div class="buttons">
			<Button type="submit">Vytvořit</Button>
		</div>
	{/if}
</form>

<style>
	form {
		width: 50%;
		justify-self: center;
	}
	.buttons {
		display: flex;
		justify-content: flex-start;
		gap: 20px;
	}
</style>
