<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import DateInput from '$components/FormComponent/DateInput.svelte';
	import type { CreateSeasonDTO, CreateSeasonResponseDTO, SeasonDTO } from '$lib/DTO/SeasonDTO';
	import type { CharityStore } from '$lib/stores/CharityStore.svelte';
	import type { SeasonStore } from '$lib/stores/SeasonStore.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';

	const seasonStore = getContext<SeasonStore>('seasonStore');
	const charityStore = getContext<CharityStore>('charityStore');
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
		<form method="post" action="/administration/season/?/create" use:enhance={enhancer}>
			<label for="charity">Charita:</label>
			<select name="charity" id="charity">
				{#each charities as charity}
					<option value={charity.id}>{charity.name}</option>
				{/each}
			</select>

			<label for="start">Začátek sezóny:</label>
			<DateInput bind:date={season.start} minDate={today} name="start" id="start" />

			<label for="end">Konec sezóny:</label>
			<DateInput bind:date={season.end} minDate={minEnd} name="end" id="end" />

			<span class="note">
				<b>Poznámka:&nbsp;</b>výchozí datum konce sezóny je začátek + 4 týdny
			</span>

			<Button type="submit">Vytvořit</Button>
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
