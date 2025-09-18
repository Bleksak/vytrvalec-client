<script lang="ts">
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import DateInput from '$components/FormComponent/DateInput.svelte';
	import ImageForm from '$components/forms/ImageForm.svelte';
	import MultiStepForm from '$components/MultiStepForm.svelte';
	import type { SeasonDTO } from '$lib/DTO/SeasonDTO.js';
	import { m } from '$paraglide/messages';
	import { getLocale, locales } from '$paraglide/runtime';
	import { seasonCreateAction } from '$remote/season.remote';

	const { data } = $props();

	let imageUuid = $state(null);

	let errors: Record<string, string> = $state({});

	const defaultStartDateValue = new Date();

	let startDateValue = $state(defaultStartDateValue);
	let endDateValue = $state(defaultStartDateValue);
	const fourWeeks = 27 * 24 * 60 * 60 * 1000;

	let isTestSeason = $state(true);
	let sendStartNotification = $state(false);

	let copyFacultyMappingFrom = $state<SeasonDTO | null>(null);
	let facultyMappings = $derived(copyFacultyMappingFrom?.faculty_mapping);
	let facultyMappingRecord = $derived.by(() => {
		let result: Map<number, number|null> = new Map();

		for (const mapping of facultyMappings ?? []) {
			let faculty_id = mapping.faculty_id;
			let parent_id = mapping.parent_id;

			result.set(faculty_id, parent_id);
		}

		return result;
	});

	const enhancer = seasonCreateAction.enhance(async ({ form, submit }) => {
		try {
			await submit();
			form.reset();
		} catch (data: any) {
			const body = data.body as App.Error;
			if (body.errors) {
				errors = body.errors;
			}
		}
	});

	$effect(() => {
		endDateValue = new Date(startDateValue.getTime() + fourWeeks);
	});
</script>

{#snippet submit()}
	<button type="submit">Odeslat</button>
{/snippet}

{#snippet charityStep()}
	<section>
		<label for="charity_image">Obrázek charity</label>
		<ImageForm bind:imageUuid id="charity_image" />
		{#if errors && errors.icon}
			<small aria-invalid="true">
				{m['forms.charity.errors.icon.string.uuid.v7']()}
			</small>
		{/if}
	</section>

	<section>
		<input type="hidden" name="charity[image]" value={imageUuid} />
		{#each locales as locale}
			<fieldset>
				<label for="name_{locale}">Název charity ({locale})</label>
				<input
					type="text"
					id="name_{locale}"
					name="charity[translations][name][{locale}]"
					aria-invalid={errors[`translations,name,${locale}`] ? 'true' : undefined}
				/>
				{#if errors[`translations,name,${locale}`]}
					<small aria-invalid="true">
						{(m as any)[
							`forms.charity.errors.translations,name.${errors[`translations,name,${locale}`]}`
						]()}
					</small>
				{/if}

				<label for="description_{locale}">Popis charity ({locale})</label>
				<textarea
					name="charity[translations][description][{locale}]"
					id="description_{locale}"
					aria-invalid={errors[`translations,description,${locale}`] ? 'true' : undefined}
				></textarea>
				{#if errors[`translations,description,${locale}`]}
					<small aria-invalid="true">
						{(m as any)[
							`forms.charity.errors.translations,description.${errors[`translations,description,${locale}`]}`
						]()}
					</small>
				{/if}
			</fieldset>
		{/each}

		<fieldset>
			<label for="website">Webová stránka charity</label>
			<input
				type="url"
				name="charity[website]"
				id="website"
				aria-invalid={errors.website ? 'true' : undefined}
			/>
			{#if errors.website}
				<small aria-invalid="true">
					{(m as any)[`forms.charity.errors.website.${errors.website}`]()}
				</small>
			{/if}
		</fieldset>
	</section>
{/snippet}

{#snippet facultyStep()}
	<section>
		<div class="grid">
			<label for="copy-from">Vykopírovat z předchozí sezóny:</label>
			<select bind:value={copyFacultyMappingFrom}>
				<option value={null}>Nekopírovat</option>
				{#each data.seasons as [_, season]}
					<option value={season}>
						{season.charity.name.cs} - {season.start.toLocaleString(getLocale(), {
							dateStyle: 'medium'
						})}
					</option>
				{/each}
			</select>
		</div>

		<hr />

		<section class="grid">
			<span>Fakulta</span>
			<span>Nadřazená fakulta</span>
		</section>

		{#each data.faculties as [id, faculty], i}
			<div class="grid">
				<label for="faculty-{id}">
					{faculty.name.cs}:
				</label>

				<input type="hidden" name="faculty_mapping[{i}][faculty]" value={id} />

				<select name="faculty_mapping[{i}][parent]">
					<option selected={facultyMappingRecord.get(faculty.id) === null} value={null}>Žádná</option>
					{#each data.faculties as [parent_id, parent_faculty]}
						{#if parent_id !== id}
							<option value={parent_id} selected={facultyMappingRecord.get(faculty.id) === parent_id}>
								{parent_faculty.name.cs}
							</option>
						{/if}
					{/each}
				</select>
			</div>
		{/each}
	</section>
{/snippet}

{#snippet seasonStep()}
	<section>
		<div class="grid">
			<fieldset>
				<label for="start">Začátek sezóny</label>
				<DateInput bind:date={startDateValue} name="season[start]" id="start" />
			</fieldset>

			<fieldset>
				<label for="end">Konec sezóny</label>
				<DateInput bind:date={endDateValue} name="season[end]" id="end" />
				<small>
					<b>Poznámka:&nbsp;</b>
					výchozí datum konce sezóny je začátek + 27 dní (doba trvání sezóny je tedy 28 dní)
				</small>
			</fieldset>
		</div>

		<fieldset>
			<Checkbox
				bind:checked={isTestSeason}
				id="test-season"
				name="season[is_test]"
				role="switch"
				defaultChecked={true}
			>
				Testovací sezóna
			</Checkbox>
		</fieldset>

		<fieldset>
			<Checkbox
				bind:checked={sendStartNotification}
				id="send-start-notification"
				name="season[notify_users]"
				role="switch"
				defaultChecked={false}
			>
				Odeslat e-maily
			</Checkbox>
			<small>
				<b>Poznámka:&nbsp;</b>
				při založení testovací sezóny budou e-maily odeslány pouze na administrátorské účty.
			</small>
		</fieldset>

		<fieldset>
			<label for="notification-date">Datum odeslání e-mailů</label>
			<DateInput
				disabled={!sendStartNotification}
				id="notification-date"
				name="season[notification_date]"
				date={startDateValue}
			/>
			<small>
				<b>Poznámka:&nbsp;</b>
				výchozí datum odeslání e-mailů je datum začátku sezóny
			</small>
		</fieldset>
	</section>
{/snippet}

<form {...enhancer}>
	<MultiStepForm
		{submit}
		steps={[
			{
				title: 'Charita',
				content: charityStep
			},
			{
				title: 'Fakulty',
				content: facultyStep
			},
			{
				title: 'Sezóna',
				content: seasonStep
			}
		]}
	/>
</form>
