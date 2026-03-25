<script lang="ts">
    import Store from '$lib/enums/Stores';
    import type { DialogStore } from '$lib/stores/DialogStore.svelte';
    import { XIcon } from '@lucide/svelte';
    import { getContext, type Snippet } from 'svelte';
    import type { HTMLDialogAttributes } from 'svelte/elements';

    let {
        dialog,
        header,
        children,
        ...props
    }: HTMLDialogAttributes & {
        dialog?: HTMLDialogElement;
        header: string;
        children: Snippet;
    } = $props();

    const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);

    export function close() {
        dialogStore.close();
    }

    $effect(() => {
        dialog?.showModal();
    });
</script>

<dialog bind:this={dialog} {...props} onclose={close}>
    <article>
        <header>
            <h5>{header}</h5>

            <button onclick={close} type="button">
                <XIcon />
            </button>
        </header>
        <section>
            {@render children()}
        </section>
    </article>
</dialog>

<style>
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
    }
</style>
