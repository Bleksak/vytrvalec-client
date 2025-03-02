<script lang="ts">
    import {type Snippet } from 'svelte';

    const { text, children } : {
        text: string;
        children: Snippet
    } = $props();

</script>

<div class="tooltip">
    {@render children()}
    <span class="tooltip-text">
        {text}
    </span>
</div>

<style>
	.tooltip {
		position: relative;
		display: flex;
		align-items: center;
	}

	.tooltip .tooltip-text {
		visibility: hidden;
		position: absolute;
		background-color: #555;
		color: #fff;
		text-align: center;
		padding: 5px;
		border-radius: 6px;
		z-index: 1;
		opacity: 0;
		transition: opacity .6s;
		bottom: 125%;
	}

	.tooltip:hover .tooltip-text {
		visibility: visible;
		opacity: 1;
	}
</style>

