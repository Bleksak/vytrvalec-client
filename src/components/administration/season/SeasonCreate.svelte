<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import DateInput from '$components/FormComponent/DateInput.svelte';
	import Select from '$components/FormComponent/Select.svelte';
	import type { CreateSeasonResponseDTO, SeasonDTO } from '$lib/DTO/SeasonDTO';
	import Store from '$lib/enums/Stores';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	const seasonStore = getContext<SeasonStore>(Store.SEASON_STORE);
	const charityStore = getContext<CharityStore>(Store.CHARITY_STORE);
	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
	const fourWeeks = 4 * 7 * 24 * 60 * 60 * 1000;

	const today = new Date();
	const minEnd = new Date(today.getTime() + fourWeeks);

	let season = $state<SeasonDTO>({
		id: 0,
		start: new Date(),
		end: new Date(),
		charity: 0
	});

	$effect(() => {
		season.end = new Date(season.start.getTime() + fourWeeks);
	});

	const enhancer: SubmitFunction<CreateSeasonResponseDTO> = () => {
		return ({ result }) => {
			if (result.type === 'success') {
				season.id = result.data?.id!;
				seasonStore.updateOrCreate(season);
				toastStore.add({
					type: 'success',
					message: 'Sezóna vytvořena'
				});
			} else {
				toastStore.add({
					type: 'error',
					message: 'Nastala chyba při tvorbě sezóny'
				});
			}
		};
	};
</script>

{#await charityStore.promise()}
	<span class="header-warning">Načítání...</span>
{:then charities}
	{#if charityStore.all().length === 0}
		<span class="header-warning">
			Před vytvořením sezóny je potřeba
			<a class="note" href="/administration/charity">vytvořit charitu</a>
		</span>
	{:else}
		<form method="post" action="/administration/season?/create" use:enhance={enhancer}>
			<label for="charity">Charita:</label>
			<Select
				name="charity"
				id="charity"
				keys={charities.map((charity) => charity.name)}
				values={charities.map((charity) => charity.id)}
			/>
			<label for="start">Začátek sezóny:</label>
			<DateInput bind:date={season.start} minDate={today} name="start" id="start" />

			<label for="end">Konec sezóny:</label>
			<DateInput bind:date={season.end} minDate={minEnd} name="end" id="end" />

			<span class="note">
				<b>Poznámka:&nbsp;</b>výchozí datum konce sezóny je začátek + 4 týdny
			</span>

			<Button class="left" type="submit">Vytvořit</Button>
		</form>
	{/if}
{/await}

<style>
	.header-warning {
		font-size: 1.3rem;
	}

	a.note {
		text-decoration: underline;
	}
</style>
