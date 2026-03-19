<script lang="ts">
    import type { HTMLDialogAttributes } from 'svelte/elements';
    import type { SubmissionCreateError } from '$lib/DTO/SubmissionCreateResponse';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import type { SubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
    import Dialog from '$components/Dialog.svelte';
    import LL from '$translations/i18n-svelte';
    import { getContext } from 'svelte';
    import { enhance } from '$app/forms';
    import { getGlobalContext } from '$lib/stores/GlobalContext.svelte';
    import Store from '$lib/enums/Stores';
    import ImageForm from './ImageForm.svelte';
    import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
    import type { AxiosInstance } from 'axios';

    let {
        submission,
        disabled,
        api,
        ...props
    }: {
        submission: SubmissionResponseDTO;
        disabled?: boolean;
        api: AxiosInstance;
    } & HTMLDialogAttributes = $props();

    const activityStore = getContext<ActivityStore>(Store.ACTIVITY_STORE);
    const refetchSubmissions = getGlobalContext<() => void>('refetchSubmissions');

    let errors = $state<SubmissionCreateError>();

    let dialog = $state<Dialog>();

    let imageUuid = $state<string | null>(null);

    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

    const onSubmit: SubmitFunction = ({ submitter, formData }) => {
        submitter?.setAttribute('disabled', 'disabled');
        formData.set('image_uuid', imageUuid ?? '');

        return async ({ result, update }) => {
            if (result.type === 'failure') {
                errors = result?.data?.submission as SubmissionCreateError;

                toastStore.add({
                    type: 'error',
                    message: $LL.submission.form.editErrorToast(),
                });
            } else if (result.type === 'success') {
                errors = undefined;
                dialog?.close();
                toastStore.add({
                    type: 'success',
                    message: $LL.submission.form.editSuccessToast(),
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

<Dialog bind:this={dialog} header={$LL.submission.editingTitle()} {...props}>
    <form method="POST" action="/submission?/patch" use:enhance={onSubmit}>
        <input type="hidden" name="id" value={submission.id} />
        <input type="hidden" name="updated_at" value={submission.updated_at} />
        <input type="hidden" name="image_uuid" value={imageUuid} />
        {#if submission.message}
            <p>{$LL.submission.form.comment()}:</p>
            <span>{submission.message}</span>
        {/if}
        <ImageForm bind:imageUuid imageUrl={submission.image} {disabled} {api} />
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
        <input
            type="text"
            name="distance"
            id="distance"
            {disabled}
            value={submission.distance / 1000}
        />
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
        <input
            type="text"
            name="elevation"
            id="elevation"
            {disabled}
            value={submission.elevation}
        />
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

        {#if !disabled}
            <button>
                {$LL.submission.form.edit()}
            </button>
        {/if}
    </form>
</Dialog>
