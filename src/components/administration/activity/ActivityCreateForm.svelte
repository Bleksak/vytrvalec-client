<script lang="ts">
    import ImageForm from '$components/forms/ImageForm.svelte';
    import { locales } from '$paraglide/runtime';
    import { m } from '$paraglide/messages';
    import Heading from '$components/Heading.svelte';
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { goto } from '$app/navigation';
    import type { AxiosInstance } from 'axios';

    let { api }: { api: AxiosInstance } = $props();

    let imageUuid = $state(null);
    let errors: Record<string, string> = $state({});
    let submitButtonDisabled = $state(false);

    const enhancer: SubmitFunction = ({ submitter }) => {
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
        <h1>Nová aktivita</h1>
    </Heading>

    <section>
        <label for="image">Ikonka aktivity</label>
        <ImageForm bind:imageUuid id="image" {api} />
        {#if errors.icon}
            <small aria-invalid="true">
                {m['forms.activity.errors.icon.string.uuid.v7']()}
            </small>
        {/if}
    </section>

    <section>
        <form use:enhance={enhancer} action="/administration/activity?/create" method="post">
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
                <label for="min-elevation">Minimální převýšení pro udělení extra bodů (metry)</label
                >
                <input
                    type="number"
                    id="min-elevation"
                    name="min_elevation"
                    aria-invalid={errors && errors.min_elevation ? 'true' : undefined}
                />
                {#if errors.min_elevation}
                    <small>
                        {(m as any)[
                            `forms.activity.errors.min_elevation.${errors.min_elevation}`
                        ]()}
                    </small>
                {/if}
            </fieldset>

            <button aria-busy={submitButtonDisabled} disabled={submitButtonDisabled} type="submit">
                Vytvořit
            </button>
        </form>
    </section>
</article>
