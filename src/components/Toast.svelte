<script lang="ts">
	import Store from '$lib/enums/Stores';
	import type { Toast, ToastStore } from '$lib/stores/ToastStore.svelte';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	let { toast } : { toast: Toast }= $props();

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	const closeToast = () => {
		toastStore.remove(toast);
	};
</script>

<button
	type="button"
	class="toast"
	class:toast-error={toast.type === 'error'}
	class:toast-success={toast.type === 'success'}
	onclick={closeToast}
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
