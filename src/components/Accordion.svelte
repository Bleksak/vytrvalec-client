<script lang="ts">
    import type { Snippet } from 'svelte';
    import { slide } from 'svelte/transition';

    let {
        opened = $bindable(),
        className = '',
        children,
    }: { opened: boolean; className?: string; children: Snippet } = $props();
</script>

{#if opened}
    <ul class={className} transition:slide>
        {@render children()}
    </ul>
{/if}
