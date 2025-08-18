<script lang="ts">
	import ImageForm from '$components/forms/ImageForm.svelte';
	import { createActivityAction } from '$remote/activity.remote';
	import { locales } from '$paraglide/runtime';
	import { m } from '$paraglide/messages';
	import Heading from '$components/Heading.svelte';

	let imageUuid = $state(null);
	let errors: Record<string, string> = $state({});

	let submitButtonDisabled = $state(false);

	const enhancer = createActivityAction.enhance(async ({ form, submit }) => {
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
		<h1>Nová aktivita</h1>
	</Heading>

	<section>
		<label for="image">Ikonka aktivity</label>
		<ImageForm bind:imageUuid id="image" />
		{#if errors.icon}
			<small aria-invalid="true">
				{m['forms.activity.errors.icon.string.uuid.v7']()}
			</small>
		{/if}
	</section>

	<section>
		<form {...enhancer} enctype="multipart/form-data">
			<input type="hidden" name="icon" value={imageUuid} />
			{#each locales as locale}
				<fieldset>
					<label for="name_{locale}">Název aktivity ({locale})</label>
					<input
						type="text"
						id="name_{locale}"
						name="translations[name][{locale}]"
						aria-invalid={errors[`translations,name,${locale}`] ? 'true' : undefined}
					/>
					{#if errors[`translations,name,${locale}`]}
						<small>
							{(m as any)[
								`forms.activity.errors.translations,name,${locale}.${errors[`translations,name,${locale}`]}`
							]()}
						</small>
					{/if}
				</fieldset>
			{/each}

			<fieldset>
				<label for="min-elevation">Minimální převýšení pro udělení extra bodů (metry)</label>
				<input
					type="number"
					id="min-elevation"
					name="min_elevation"
					aria-invalid={errors && errors.min_elevation ? 'true' : undefined}
				/>
				{#if errors.min_elevation}
					<small>
						{(m as any)[`forms.activity.errors.min_elevation.${errors.min_elevation}`]()}
					</small>
				{/if}
			</fieldset>

			<button aria-busy={submitButtonDisabled} disabled={submitButtonDisabled} type="submit">
				Vytvořit
			</button>
		</form>
	</section>
</article>
