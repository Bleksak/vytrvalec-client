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
        onclose,
        ...props
    }: HTMLDialogAttributes & {
        dialog?: HTMLDialogElement;
        header: string;
        children: Snippet;
        onclose: () => void;
    } = $props();

    const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);

    export function close() {
        if (onclose) {
            onclose();
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
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h5 {
            margin: 0;
        }
    }

    dialog article {
        padding-top: 0;
    }

    .content {
        position: relative;
        display: flex;
        padding-block: 0;
        flex-direction: column;

        section {
            flex: 1;
            overflow-y: auto;
        }
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
    }
</style>
