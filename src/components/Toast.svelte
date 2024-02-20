<script lang="ts">
	import type { Toast, ToastStore } from '$lib/stores/ToastStore.svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	let { toast } = $props<{ toast: Toast }>();

	const toastStore = getContext<ToastStore>('toastStore');

	const closeToast = () => {
		toastStore.remove(toast);
	};
</script>

<button
	type="button"
	class="toast"
	class:toast-error={toast.type === 'error'}
	class:toast-success={toast.type === 'success'}
	on:click={closeToast}
	transition:fade
>
	{toast.message}
</button>

<style>
	.toast {
		cursor: pointer;
		color: white;
		font-weight: bold;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 5px 5px 10px #757575;
	}

	.toast-error {
		background-color: red;
	}

	.toast-success {
		background-color: green;
	}
</style>
