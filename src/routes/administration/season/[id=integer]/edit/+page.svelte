<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import DateInput from '$components/FormComponent/DateInput.svelte';
	import Heading from '$components/Heading.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { SvelteMap } from 'svelte/reactivity';
	import { getLocale } from '$paraglide/runtime';

	const { data } = $props();

	let errors: Record<string, string> = $state({});

	let startDateValue = $state(data.season?.start ?? new Date());
	let endDateValue = $state(data.season?.end ?? new Date());
	let isTestSeason = $state(data.season?.is_test ?? false);

	const existingFacultyMapping = $derived.by(() => {
		const result = new SvelteMap<number, number | null>();
		for (const mapping of data.season?.faculty_mapping ?? []) {
			result.set(mapping.faculty_id, mapping.parent_id);
		}
		return result;
	});

	const enhancer: SubmitFunction = async ({ submitter }) => {
		submitter?.setAttribute('disabled', 'disabled');
		return async ({ result }) => {
			if (result.type === 'failure') {
				errors = result.data as any;
				submitter?.removeAttribute('disabled');
			} else if (result.type === 'redirect') {
				await goto(result.location, { invalidateAll: true });
			}
		};
	};
</script>

{#if data.season === null}
	<article>
		<header>Sezóna nebyla nalezena</header>
	</article>
{:else}
	<article>
		<Heading>
			<h1>
				Úprava sezóny: {data.season.start.toLocaleString(getLocale(), { dateStyle: 'medium' })}
			</h1>
		</Heading>

		<form method="post" action="/administration/season?/update" use:enhance={enhancer}>
			<input type="hidden" name="id" value={data.season.id} />

			<fieldset>
				<legend>Charita</legend>
				<div class="grid">
					<span>{data.season.charity.name.cs}</span>
					<a href="/administration/charity/{data.season.charity.id}" role="button" class="outline">
						Upravit charitu
					</a>
				</div>
			</fieldset>

			<fieldset>
				<div class="grid">
					<div>
						<label for="start">Začátek sezóny</label>
						<DateInput bind:date={startDateValue} name="season[start]" id="start" />
						{#if errors['season,start']}
							<small aria-invalid="true">{errors['season,start']}</small>
						{/if}
					</div>

					<div>
						<label for="end">Konec sezóny</label>
						<DateInput bind:date={endDateValue} name="season[end]" id="end" />
						{#if errors['season,end']}
							<small aria-invalid="true">{errors['season,end']}</small>
						{/if}
					</div>
				</div>
			</fieldset>

			<fieldset>
				<label for="test-season">
					<input
						type="checkbox"
						bind:checked={isTestSeason}
						id="test-season"
						name="season[is_test]"
						role="switch"
					/>
					Testovací sezóna
				</label>
			</fieldset>

			<fieldset>
				<legend>Mapování fakult</legend>

				<section class="grid faculty-header">
					<span>Fakulta</span>
					<span>Nadřazená fakulta</span>
				</section>

				{#each data.faculties as [id, faculty], i}
					<div class="grid">
						<label for="faculty-{id}">{faculty.name.cs}:</label>

						<input type="hidden" name="faculty_mapping[{i}][faculty]" value={id} />

						<select name="faculty_mapping[{i}][parent]" id="faculty-{id}">
							<option selected={existingFacultyMapping.get(faculty.id) === null} value={null}>
								Žádná
							</option>
							{#each data.faculties as [parent_id, parent_faculty]}
								{#if parent_id !== id}
									<option
										value={parent_id}
										selected={existingFacultyMapping.get(faculty.id) === parent_id}
									>
										{parent_faculty.name.cs}
									</option>
								{/if}
							{/each}
						</select>
					</div>
				{/each}
			</fieldset>

			<button type="submit">Uložit změny</button>
		</form>
	</article>
{/if}
