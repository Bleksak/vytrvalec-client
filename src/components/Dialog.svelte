<script lang="ts">
    import Store from '$lib/enums/Stores';
    import type { DialogStore } from '$lib/stores/DialogStore.svelte';
    import { XIcon } from '@lucide/svelte';
    import { getContext, type Snippet } from 'svelte';
    import type { EventHandler, HTMLDialogAttributes } from 'svelte/elements';

    let {
        dialog,
        header,
        children,
        onclose,
        ...props
    }: HTMLDialogAttributes & {
        dialog?: HTMLDialogElement;
        header: string;
        children: Snippet;
        onclose?: EventHandler<Event, HTMLDialogElement> | null;
    } = $props();

    const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);

    export function close(event?: Event) {
        if (onclose) {
            onclose(event as Event & { currentTarget: EventTarget & HTMLDialogElement });
        }

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
        position: sticky;
        top: 0;
        z-index: 99;
        background: inherit;
        padding-block: var(--pico-spacing);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    dialog article {
        padding-top: 0;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
    }
</style>
