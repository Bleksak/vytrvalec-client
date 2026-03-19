<script lang="ts">
    import Dialog from '$components/Dialog.svelte';
    import LL from '$translations/i18n-svelte';
    import type { HTMLDialogAttributes } from 'svelte/elements';
    import type { SubmissionCreateError } from '$lib/DTO/SubmissionCreateResponse';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { getContext } from 'svelte';
    import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import { enhance } from '$app/forms';
    import { getGlobalContext } from '$lib/stores/GlobalContext.svelte';
    import Store from '$lib/enums/Stores';
    import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
    import ImageForm from './ImageForm.svelte';
    import type { AxiosInstance } from 'axios';

    let { api, ...props }: { api: AxiosInstance } & HTMLDialogAttributes = $props();

    const refetchSubmissions = getGlobalContext<() => void>('refetchSubmissions');

    let errors = $state<SubmissionCreateError>();

    let dialog = $state<Dialog>();

    let imageUuid = $state<string | null>(null);

    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
    const activityStore = getContext<ActivityStore>(Store.ACTIVITY_STORE);

    const onSubmit: SubmitFunction = ({ submitter, formData }) => {
        submitter?.setAttribute('disabled', 'disabled');
        formData.set('image_uuid', imageUuid ?? '');

        return async ({ result, update }) => {
            if (result.type === 'failure') {
                errors = result?.data?.submission as SubmissionCreateError;

                toastStore.add({
                    type: 'error',
                    message: $LL.submission.form.error(),
                });
            } else if (result.type === 'success') {
                errors = undefined;
                dialog?.close();
                toastStore.add({
                    type: 'success',
                    message: $LL.submission.form.success(),
                });

                if (refetchSubmissions) {
                    refetchSubmissions();
                }
            }

            submitter?.removeAttribute('disabled');

            update();
        };
    };
</script>

<Dialog bind:this={dialog} header={$LL.submission.title()} {...props}>
    <form method="POST" action="/submission?/create" use:enhance={onSubmit}>
        <ImageForm bind:imageUuid {api} />
        {#each errors?.image_uuid ?? [] as error}
            <span class="error">
                {$LL.submission.form.errors.image[
                    error as keyof typeof $LL.submission.form.errors.image
                ]()}
            </span>
        {/each}

        <label for="distance">
            {$LL.submission.form.distance()} (km):
        </label>
        <input type="text" name="distance" id="distance" />
        {#each errors?.distance ?? [] as error}
            <span class="error">
                {$LL.submission.form.errors.distance[
                    error as keyof typeof $LL.submission.form.errors.distance
                ]()}
            </span>
        {/each}

        <label for="elevation">
            {$LL.submission.form.elevation()} (m):
        </label>
        <input type="text" name="elevation" id="elevation" />
        {#each errors?.elevation ?? [] as error}
            <span class="error">
                {$LL.submission.form.errors.elevation[
                    error as keyof typeof $LL.submission.form.errors.elevation
                ]()}
            </span>
        {/each}

        <label for="activity">
            {$LL.submission.form.activity()}:
        </label>
        {#await activityStore.promise()}
            <span>Načítání</span>
        {:then activities}
            <select name="activity" id="activity">
                {#each activities as activity}
                    <option value={activity.id}>{activity.name.cs}</option>
                {/each}
            </select>
        {/await}
        <button disabled={!imageUuid}>
            {$LL.submission.form.submit()}
        </button>
    </form>
</Dialog>
