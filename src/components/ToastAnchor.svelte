<script lang="ts">
    import { fade } from 'svelte/transition';
    import Toast from './Toast.svelte';
    import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import { multiPortal } from '$utils/Portal';

    const { toastStore }: { toastStore: ToastStore } = $props();
</script>

{#if toastStore.toasts().length > 0}
    <div {@attach multiPortal(['dialog', 'body'])} class="toasts-anchor" transition:fade>
        <div class="toasts">
            {#each toastStore.toasts() as toast}
                <Toast {toast} />
            {/each}
        </div>
    </div>
{/if}

<style>
    .toasts-anchor {
        z-index: 9999;
        position: fixed;

        bottom: 10%;
        right: 10%;
    }
    .toasts {
        position: relative;

        display: flex;
        flex-direction: column-reverse;
        gap: 20px;
    }
</style>
