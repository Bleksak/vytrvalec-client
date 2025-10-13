<script lang="ts">
	import { locales } from '$paraglide/runtime';
	import { m } from '$paraglide/messages';
	import type { SvelteMap } from 'svelte/reactivity';
	import type { FacultyDTO } from '$lib/DTO/FacultyDTO';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import Heading from '$components/Heading.svelte';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';

	const { faculty }: { faculties: SvelteMap<number, FacultyDTO>; faculty: FacultyDTO } = $props();

	let errors: Record<string, string> = $state({});
	let submitButtonDisabled = $state(false);

	const enhancer: SubmitFunction = async ({ submitter }) => {
		submitter?.setAttribute('disabled', 'disabled');
		submitButtonDisabled = true;

		return async ({ result }) => {
			if (result.type === 'failure') {
				errors = result.data as any;

				submitter?.removeAttribute('disabled');
				submitButtonDisabled = false;
			} else if (result.type === 'redirect') {
				await goto(result.location);
			}
		};
	};
</script>

<article>
	<Heading>
		<h1>Úprava pracoviště</h1>
	</Heading>
	<section>
		<form use:enhance={enhancer} method="post" action="/administration/faculty?/update">
			<input type="hidden" name="id" value={faculty.id} />
			{#each locales as locale}
				<fieldset>
					<label for="name_{locale}">Název fakulty ({locale})</label>
					<input
						type="text"
						id="name_{locale}"
						name="translations[name][{locale}]"
						aria-invalid={errors[`translations,name,${locale}`] ? 'true' : undefined}
						value={faculty.name[locale]}
					/>
					{#if errors[`translations,name,${locale}`]}
						<small>
							{(m as any)[
								`forms.faculty.errors.translations,name,${locale}.${errors[`translations,name,${locale}`]}`
							]()}
						</small>
					{/if}
				</fieldset>
			{/each}

			<fieldset>
				<label for="shortcut">Zkratka</label>
				<input
					type="text"
					id="shortcut"
					name="shortcut"
					aria-invalid={errors && errors.shortcut ? 'true' : undefined}
					value={faculty.shortcut}
				/>
				{#if errors.shortcut}
					<small>
						{(m as any)[`forms.faculty.errors.shortcut.${errors.shortcut}`]()}
					</small>
				{/if}
			</fieldset>

			<fieldset>
				<label for="color">Barva fakulty</label>
				<input type="color" name="color" id="color" value={faculty.color} />
				{#if errors.color}
					<small>
						{(m as any)[`forms.faculty.errors.color.${errors.color}`]()}
					</small>
				{/if}
			</fieldset>

			<fieldset>
				<Checkbox id="visible" name="visible" role="switch" defaultChecked={faculty.visible}>
					Aktivní
				</Checkbox>
			</fieldset>

			<fieldset>
				<button aria-busy={submitButtonDisabled} disabled={submitButtonDisabled} type="submit">
					Upravit
				</button>
			</fieldset>
		</form>
	</section>
</article>
