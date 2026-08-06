<script lang="ts">
    import { enhance } from '$app/forms';
    import Dialog from '$components/Dialog.svelte';
    import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import type { SubmissionResponseAdminDTO } from '$lib/DTO/SubmissionDTO';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { getContext } from 'svelte';
    import type { SubmissionStore } from '$lib/stores/SubmissionStore.svelte';
    import type { SubmissionStateError } from '$lib/DTO/SubmissionStateDTO';
    import { LL } from '$translations/i18n-svelte';
    import Store from '$lib/enums/Stores';
    import type { ActivityStore } from '$lib/stores/ActivityStore.svelte';
    import { getLocale } from '$paraglide/runtime';

    const { currentSubmission }: { currentSubmission: SubmissionResponseAdminDTO } = $props();

    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);
    const activityStoreHandler = getContext<() => ActivityStore>(Store.ACTIVITY_STORE);
    const locale = $state(getLocale());

    let dialog = $state<Dialog>();

    const submissionStore = getContext<SubmissionStore>(Store.SUBMISSION_STORE);
    let errors = $state<SubmissionStateError>();

    const enhancer: SubmitFunction<{ updated_at: string }> = ({ formData }) => {
        return async ({ update, result }) => {
            if (result.type === 'success') {
                currentSubmission!.state =
                    formData.get('state')?.toString() === '1' ? 'accepted' : 'rejected';
                currentSubmission!.updated_at! = result!.data!.updated_at!;

                submissionStore?.update(currentSubmission!);

                dialog?.close();
                toastStore.add({
                    type: 'success',
                    message: 'Akce proběhla úspěšně',
                });
                errors = undefined;
            } else if (result.type === 'failure') {
                errors = result?.data as SubmissionStateError;
                toastStore.add({
                    type: 'error',
                    message: 'Akci nebylo možné dokončit, zkuste to prosím znovu',
                });
            }

            update();
        };
    };
</script>

<Dialog bind:this={dialog} header="Detail aktivity">
    <form action="/submission?/state" method="POST" use:enhance={enhancer}>
        <img src={currentSubmission.image} alt="Aktivita" />
        <input type="hidden" name="id" value={currentSubmission.id} />
        <input type="hidden" name="updated_at" value={currentSubmission.updated_at} />

        {#each errors?.submission_state ?? [] as error}
            <span class="error">
                <span class="error"
                    >{$LL.submission.errors[error as keyof typeof $LL.submission.errors]()}</span
                >
            </span>
        {/each}

        {#await activityStoreHandler().promise() then}
            <p>
                <strong>Aktivita:&nbsp;</strong>{activityStoreHandler().get(
                    currentSubmission.activity_id,
                )?.name[locale]}
            </p>
        {/await}
        <p><strong>Vzdálenost:&nbsp;</strong>{currentSubmission.distance / 1000} km</p>
        {#if currentSubmission.elevation}
            <p><strong>Převýšení:&nbsp;</strong>{currentSubmission.elevation} m</p>
        {/if}

        {#if currentSubmission.state !== 'pending'}
            <span class="note">
                <strong>Poznámka:&nbsp;</strong>
                aktivita již byla dříve zkontrolována
            </span>

            <label for="message">Komentář:</label>
            <textarea name="message" id="message">{currentSubmission.message}</textarea>

            <div class="send-buttons">
                {#if currentSubmission.state === 'accepted'}
                    <button class="left danger" name="state" value="0" type="submit"
                        >Zamítnout</button
                    >
                    <button class="right secondary" name="state" value="1" type="submit">
                        Upravit zprávu
                    </button>
                {:else}
                    <button class="left" name="state" value="1" type="submit">Schválit</button>
                    <button class="right secondary" name="state" value="0" type="submit">
                        Upravit zprávu
                    </button>
                {/if}
            </div>
        {:else}
            <label for="message">Komentář:</label>
            <textarea name="message" id="message"></textarea>
            <div class="send-buttons">
                <button class="left danger" name="state" value="0" type="submit">Zamítnout</button>
                <button class="right" name="state" value="1" type="submit">Schválit</button>
            </div>
        {/if}
    </form>
</Dialog>

<style>
    .send-buttons {
        width: 100%;
        display: flex;
    }

    .left {
        margin-right: 0.5rem;
    }
</style>
