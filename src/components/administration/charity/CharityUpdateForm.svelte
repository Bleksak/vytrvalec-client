<script lang="ts">
	import ImageForm from '$components/forms/ImageForm.svelte';
	import { locales } from '$paraglide/runtime';
	import { m } from '$paraglide/messages';
	import type { CharityDTO } from '$lib/DTO/CharityDTO';
	import Heading from '$components/Heading.svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	const { charity }: { charity: CharityDTO } = $props();

	let imageUuid = $state(null);
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
				await goto(result.location, { invalidateAll: true });
			}
		};
	};
</script>

<article>
	<Heading>
		<h1>Úprava charity</h1>
	</Heading>
	<section>
		<label for="image">Obrázek charity</label>
		<ImageForm bind:imageUuid id="image" imageUrl={charity.image} />
		{#if errors && errors.icon}
			<small aria-invalid="true">
				{m['forms.charity.errors.icon.string.uuid.v7']()}
			</small>
		{/if}
	</section>

	<section>
		<form method="post" action="/administration/charity?/update" use:enhance={enhancer}>
			<input type="hidden" name="id" value={charity.id} />
			<input type="hidden" name="image" value={imageUuid} />
			{#each locales as locale}
				<fieldset>
					<label for="name_{locale}">Název charity ({locale})</label>
					<input
						type="text"
						id="name_{locale}"
						name="translations[name][{locale}]"
						aria-invalid={errors[`translations,name,${locale}`] ? 'true' : undefined}
						value={charity.name[locale]}
					/>
					{#if errors[`translations,name,${locale}`]}
						<small aria-invalid="true">
							{(m as any)[
								`forms.charity.errors.translations,name,${locale}.${errors[`translations,name,${locale}`]}`
							]()}
						</small>
					{/if}

					<label for="description_{locale}">Popis charity ({locale})</label>
					<textarea
						name="translations[description][{locale}]"
						id="description_{locale}"
						aria-invalid={errors[`translations,description,${locale}`] ? 'true' : undefined}
						value={charity.description[locale]}
					></textarea>
					{#if errors[`translations,description,${locale}`]}
						<small aria-invalid="true">
							{(m as any)[
								`forms.charity.errors.translations,description,${locale}.${errors[`translations,description,${locale}`]}`
							]()}
						</small>
					{/if}
				</fieldset>
			{/each}

			<fieldset>
				<label for="website">Webová stránka charity</label>
				<input
					type="url"
					name="website"
					id="website"
					aria-invalid={errors.website ? 'true' : undefined}
					value={charity.website}
				/>
				{#if errors.website}
					<small aria-invalid="true">
						{(m as any)[`forms.charity.errors.website.${errors.website}`]()}
					</small>
				{/if}
			</fieldset>

			<button aria-busy={submitButtonDisabled} disabled={submitButtonDisabled} type="submit">
				Upravit
			</button>
		</form>
	</section>
</article>
