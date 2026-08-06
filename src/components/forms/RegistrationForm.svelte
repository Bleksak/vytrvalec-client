<script lang="ts">
    import Dialog from '$components/Dialog.svelte';
    import { enhance } from '$app/forms';
    import LL from '$translations/i18n-svelte';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { HTMLDialogAttributes } from 'svelte/elements';
    import type { RegistrationError } from '$lib/DTO/UserRegisterResponse';
    import { getContext } from 'svelte';
    import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import Store from '$lib/enums/Stores';
    import type { FacultyStore } from '$lib/stores/FacultyStore.svelte';
    import { PasswordEstimator } from '$lib/PasswordEstimator';
    import PasswordProgress from '$components/FormComponent/PasswordProgress.svelte';
    import Tooltip from '$components/Tooltip.svelte';
    import Required from '$components/FormComponent/Required.svelte';

    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

    let { ...props }: HTMLDialogAttributes = $props();
    let dialog = $state<Dialog>();
    let strength = $state<number>(0);

    const facultyStoreHandler = getContext<() => FacultyStore>(Store.FACULTY_STORE);

    let errors = $state<RegistrationError>();

    const estimatePwdStrength = (event: KeyboardEvent) => {
        strength = PasswordEstimator.estimateStrength((event.target as HTMLInputElement).value);
    };

    const enhancer: SubmitFunction = () => {
        return async ({ result }) => {
            if (result.type === 'success') {
                toastStore.add({
                    type: 'success',
                    message: $LL.registration.success(),
                });
                errors = undefined;
                dialog?.close();
            } else if (result.type === 'failure') {
                errors = result?.data?.register as RegistrationError;
                toastStore.add({
                    type: 'error',
                    message: $LL.registration.error(),
                });
            }
        };
    };
</script>

<Dialog bind:this={dialog} header={$LL.registration.title()} {...props}>
    <form method="POST" action="/auth?/register" use:enhance={enhancer}>
        <fieldset>
            <label for="faculty">
                {$LL.registration.faculty()}:<Required />
            </label>
            {#await facultyStoreHandler().promise() then faculties}
                {@const registrationFaculties = faculties.filter((faculty) => faculty.visible)}
                <select name="faculty" id="faculty">
                    {#each registrationFaculties as faculty}
                        <option value={faculty.id}>{faculty.name.cs}</option>
                    {/each}
                </select>
            {:catch}
                <span class="note">{$LL.registration.errors.faculty.no_faculties()}</span>
            {/await}
            {#each errors?.faculty ?? [] as error}
                <span class="error">
                    {$LL.registration.errors.faculty[
                        error as keyof typeof $LL.registration.errors.faculty
                    ]()}
                </span>
            {/each}
        </fieldset>

        <fieldset>
            <label for="email">
                {$LL.registration.email()}:<Required />
            </label>
            <input type="email" name="email" id="email" />
            {#each errors?.email ?? [] as error}
                <span class="error">
                    {$LL.registration.errors.email[
                        error as keyof typeof $LL.registration.errors.email
                    ]()}
                </span>
            {/each}
        </fieldset>

        <fieldset>
            <label for="password">
                {$LL.registration.password()}:<Required />
            </label>
            <input type="password" name="password" id="password" onkeyup={estimatePwdStrength} />
            <PasswordProgress {strength} />
            {#each errors?.password ?? [] as error}
                <span class="error">
                    {$LL.registration.errors.password[
                        error as keyof typeof $LL.registration.errors.password
                    ]()}
                </span>
            {/each}
        </fieldset>

        <fieldset>
            <label for="password_repeat">
                {$LL.registration.password_repeat()}:<Required />
            </label>
            <input type="password" name="password_repeat" id="password_repeat" />
            {#each errors?.password_repeat ?? [] as error}
                <span class="error">
                    {$LL.registration.errors.password_repeat[
                        error as keyof typeof $LL.registration.errors.password_repeat
                    ]()}
                </span>
            {/each}
        </fieldset>

        <fieldset>
            <label for="first_name">
                {$LL.registration.first_name()}:<Required />
            </label>
            <input type="text" name="first_name" id="first_name" />
            {#each errors?.first_name ?? [] as error}
                <span class="error">
                    {$LL.registration.errors.first_name[
                        error as keyof typeof $LL.registration.errors.first_name
                    ]()}
                </span>
            {/each}
        </fieldset>

        <fieldset>
            <label for="last_name">
                {$LL.registration.last_name()}:<Required />
            </label>
            <input type="text" name="last_name" id="last_name" />
            {#each errors?.last_name ?? [] as error}
                <span class="error">
                    {$LL.registration.errors.last_name[
                        error as keyof typeof $LL.registration.errors.last_name
                    ]()}
                </span>
            {/each}
        </fieldset>

        <fieldset>
            <Tooltip
                text={`${$LL.anonym.description1()}${$LL.anonym.description2()}${$LL.anonym.description3()}`}
            >
                <label for="anonymize">
                    <input type="checkbox" id="anonymize" name="anonymize" />
                    {$LL.anonym.label()}
                </label>
            </Tooltip>
        </fieldset>

        <fieldset>
            <Tooltip text={$LL.registration.gdpr_tooltip()}>
                <label for="gdpr">
                    <input type="checkbox" id="gdpr" name="gdpr" />
                    {$LL.registration.gdpr()}<Required />
                </label>
            </Tooltip>
            {#each errors?.gdpr ?? [] as error}
                <span class="error">
                    {$LL.registration.errors.gdpr[
                        error as keyof typeof $LL.registration.errors.gdpr
                    ]()}
                </span>
            {/each}
        </fieldset>

        <fieldset>
            <button>{$LL.registration.submit()}</button>
        </fieldset>
    </form>
</Dialog>
