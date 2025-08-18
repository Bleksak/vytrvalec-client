<script lang="ts">
	import ImageForm from '$components/forms/ImageForm.svelte';
	import { updateActivityAction } from '$remote/activity.remote';
	import { locales } from '$paraglide/runtime';
	import { m } from '$paraglide/messages';
	import type { ActivityDTO } from '$lib/DTO/ActivityDTO';

	const { activity }: { activity: ActivityDTO } = $props();

	let imageUuid = $state(undefined);

	let errors: Record<string, string> = $state({});

	const enhancer = updateActivityAction.enhance(async ({ form, submit }) => {
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
</script>

<section>
	<label for="image">Ikonka aktivity</label>
	<ImageForm imageUrl={activity.icon} bind:imageUuid id="image" />
	{#if errors.icon}
		<small aria-invalid="true">
			{m['forms.activity.errors.icon.string.uuid.v7']()}
		</small>
	{/if}
</section>

<section>
	<form {...enhancer} enctype="multipart/form-data">
		<input type="hidden" name="id" value={activity.id} />
		{#if imageUuid}
			<input type="hidden" name="icon" value={imageUuid} />
		{/if}
		{#each locales as locale}
			<fieldset>
				<label for="name_{locale}">Název aktivity ({locale})</label>
				<input
					type="text"
					id="name_{locale}"
					name="translations[name][{locale}]"
					aria-invalid={errors[`translations,name,${locale}`] ? 'true' : undefined}
					value={activity.name[locale]}
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
				value={activity.min_elevation}
			/>
			{#if errors.min_elevation}
				<small>
					{(m as any)[`forms.activity.errors.min_elevation.${errors.min_elevation}`]()}
				</small>
			{/if}
		</fieldset>

		<button type="submit">Upravit</button>
	</form>
</section>
