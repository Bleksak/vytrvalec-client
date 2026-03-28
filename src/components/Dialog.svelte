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
        if (props.onclose) {
            dialog?.dispatchEvent(new CustomEvent('close'));
        }

        dialogStore.close();
    }

    $effect(() => {
        if (!dialog) return;
        dialog?.show();
        document.body.classList.add('no-scroll');

        return () => {
            document.body.classList.remove('no-scroll');
        };
    });
</script>

<dialog bind:this={dialog} {...props}>
    <article class="content">
        <header>
            <div class="header-content">
                <h5>{header}</h5>

                <button onclick={close} type="button">
                    <XIcon />
                </button>
            </div>
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

    .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h5 {
            margin: 0;
        }
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
