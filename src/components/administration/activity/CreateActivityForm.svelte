<script lang="ts">
	import ImageForm from '$components/forms/ImageForm.svelte';
	import { createActivityAction } from '$remote/activity.remote';
	import { locales } from '$translations/i18n-util';

	let imageUuid = $state(null);

	let errors: Record<string, string> | undefined = $state();

	const enhancer = createActivityAction.enhance(async ({ form, submit }) => {
		try {
			await submit();
			form.reset();
		} catch (data: any) {
			const body = data.body as App.Error;
			errors = body.errors;
			console.log(errors);
		}
	});
</script>

<section>
	<label for="image">Ikonka aktivity</label>
	<ImageForm bind:imageUuid id="image" />
</section>

<section>
	<input type="hidden" name="image" value={imageUuid} />
	<form {...enhancer} enctype="multipart/form-data">
		{#each locales as locale}
			{@const error_condition = errors && errors[`name,${locale}`]}
			{@const aria_value = error_condition ? 'true' : undefined}
			<fieldset>
				<label for="name_{locale}">Název aktivity ({locale})</label>
				<input type="text" id="name_{locale}" name="name[{locale}]" aria-invalid={aria_value} />
				{#if errors && errors[`name,${locale}`]}
					<small>{errors[`name,${locale}`]}</small>
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
			{#if errors && errors.min_elevation}
				<small>{errors.min_elevation}</small>
			{/if}
		</fieldset>

		<button type="submit">Vytvořit</button>
	</form>
</section>
