<script lang="ts">
    import { page } from '$app/state';
</script>

{#if page.error?.message === 'activities'}
    Nepodařilo se načíst aktitivty
{:else}
    Došlo k neznámé chybě
{/if}
