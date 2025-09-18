<script lang="ts">
	import { locales } from '$paraglide/runtime';
	import { m } from '$paraglide/messages';
	import { createFacultyAction } from '$remote/faculty.remote';
	import type { SvelteMap } from 'svelte/reactivity';
	import type { FacultyDTO } from '$lib/DTO/FacultyDTO';
	import Checkbox from '$components/FormComponent/Checkbox.svelte';
	import Heading from '$components/Heading.svelte';

	const { faculties }: { faculties: SvelteMap<number, FacultyDTO> } = $props();

	let errors: Record<string, string> = $state({});
	let submitButtonDisabled = $state(false);

	const enhancer = createFacultyAction.enhance(async ({ form, submit }) => {
		try {
			submitButtonDisabled = true;
			await submit();
			form.reset();
		} catch (data: any) {
			const body = data.body as App.Error;
			errors = body.errors ?? {};
		}

		submitButtonDisabled = false;
	});
</script>

<article>
	<Heading>
		<h1>Nové pracoviště</h1>
	</Heading>
	<section>
		<form {...enhancer}>
			{#each locales as locale}
				<fieldset>
					<label for="name_{locale}">Název fakulty ({locale})</label>
					<input
						type="text"
						id="name_{locale}"
						name="translations[name][{locale}]"
						aria-invalid={errors[`translations,name,${locale}`] ? 'true' : undefined}
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
				/>
				{#if errors.shortcut}
					<small>
						{(m as any)[`forms.faculty.errors.shortcut.${errors.shortcut}`]()}
					</small>
				{/if}
			</fieldset>

			<fieldset>
				<label for="color">Barva fakulty</label>
				<input type="color" name="color" id="color" />
				{#if errors.color}
					<small>
						{(m as any)[`forms.faculty.errors.color.${errors.color}`]()}
					</small>
				{/if}
			</fieldset>

			<fieldset>
				<Checkbox id="visible" name="visible" role="switch" defaultChecked={true}>Aktivní</Checkbox>
			</fieldset>

			<button aria-busy={submitButtonDisabled} disabled={submitButtonDisabled} type="submit">
				Vytvořit
			</button>
		</form>
	</section>
</article>
