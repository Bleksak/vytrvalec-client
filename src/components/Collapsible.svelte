<script lang="ts">
    let { title } = $props<{title:string}>();
    let expanded = $state<boolean>(false);

</script>
<!-- TODO: nejakej styling -->
<div>
    <button aria-expanded={expanded} onclick={() => expanded = !expanded}>
        {title}
        {#if expanded} 
		    <img src="/images/icons/chevron-up.svg" alt="Up" />
        {:else}
		    <img src="/images/icons/chevron-down.svg" alt="Down" />
        {/if}
    </button>
        
    <div class='content' hidden={!expanded}>
        <slot/>
    </div>
</div>

<style>
    button {
        display: flex;
        flex-direction: row;
        gap: 10px;
        width: fit-content;
    }
    img {
        height: 1.5em;
		width: 1.5em;
    }
    .content {
        gap: 10px
    }
</style>