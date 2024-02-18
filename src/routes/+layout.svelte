<script lang="ts">
	import Toast from '$components/Toast.svelte';
	import createDialogStore from '$lib/stores/DialogStore.svelte';
	import { createToastStore } from '$lib/stores/ToastStore.svelte';
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	String.prototype.removeAccents = function () {
		return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	};

	const dialogStore = createDialogStore();
	const toastStore = createToastStore();

	setContext('toastStore', toastStore);
	setContext('dialogStore', dialogStore);
</script>

{#if toastStore.toasts().length > 0}
	<div class="toasts-anchor" transition:fade>
		<div class="toasts">
			{#each toastStore.toasts() as toast}
				<Toast {toast} />
			{/each}
		</div>
	</div>
{/if}

<slot />

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
