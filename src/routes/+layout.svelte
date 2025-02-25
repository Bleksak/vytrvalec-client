<script lang="ts">
	import Toast from '$components/Toast.svelte';
	import Store from '$lib/enums/Stores';
	import createActivityStore from '$lib/stores/ActivityStore.svelte';
	import createDialogStore from '$lib/stores/DialogStore.svelte';
	import createFacultyStore from '$lib/stores/FacultyStore.svelte';
	import { createToastStore } from '$lib/stores/ToastStore.svelte';
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children } = $props();

	String.prototype.removeAccents = function () {
		return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	};

	const dialogStore = createDialogStore();
	const toastStore = createToastStore();
	const activityStore = createActivityStore();
	const facultyStore = createFacultyStore();

	setContext(Store.TOAST_STORE, toastStore);
	setContext(Store.DIALOG_STORE, dialogStore);
	setContext(Store.ACTIVITY_STORE, activityStore);
	setContext(Store.FACULTY_STORE, facultyStore);
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

{@render children()}

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
