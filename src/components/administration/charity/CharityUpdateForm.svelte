<script lang="ts">
	import ImageForm from '$components/forms/ImageForm.svelte';
	import { charityUpdateAction } from '$remote/charity.remote';
	import { locales } from '$paraglide/runtime';
	import { m } from '$paraglide/messages';
	import type { CharityDTO } from '$lib/DTO/CharityDTO';
	import Heading from '$components/Heading.svelte';

	const { charity }: { charity: CharityDTO } = $props();

	let imageUuid = $state(null);
	let errors: Record<string, string> = $state({});

	let submitButtonDisabled = $state(false);

	const enhancer = charityUpdateAction.enhance(async ({ form, submit }) => {
		try {
			submitButtonDisabled = true;
			await submit();
			form.reset();
		} catch (data: any) {
			const body = data.body as App.Error;
			if (body.errors) {
				errors = body.errors;
			}
		}

		submitButtonDisabled = false;
	});
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
		<form {...enhancer}>
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
