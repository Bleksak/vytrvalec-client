<script lang="ts">
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	let { dialog, header, children, ...props } = $props<
		HTMLDialogAttributes & {
			dialog?: HTMLDialogElement;
			header: string;
			children: Snippet;
		}
	>();

	const dialogStore = getContext<DialogStore>('dialogStore');

	export function close() {
		dialogStore.close();
	}

	$effect(() => {
		dialog?.showModal();
	});
</script>

<dialog bind:this={dialog} {...props} on:close={close}>
	<header class="dialog-header">
		<h5>{header}</h5>

		<button onclick={close} type="button">
			<img src="/images/icons/close.svg" alt="Close" />
		</button>
	</header>
	<section>
		{@render children()}
	</section>
</dialog>

<style>
	dialog {
		top: 50%;
		left: 50%;
		-webkit-transform: translateX(-50%) translateY(-50%);
		-moz-transform: translateX(-50%) translateY(-50%);
		-ms-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);

		display: flex;
		flex-direction: column;
		max-width: 550px;
		width: 100%;
		background-color: white;
		border-radius: 10px;
		padding-block: 20px;
		gap: 30px;
		max-height: 100vh;

		position: fixed;
	}

	dialog::backdrop {
		transition: backdrop-filter 0.5s ease;
		background: rgba(0, 0, 0, 0.8);
	}

	.dialog-header {
		display: flex;
		justify-content: space-between;
	}

	section {
		overflow-y: auto;
	}

	.dialog-header,
	section {
		padding-inline: 30px;
		width: 90%;
		margin: 0 auto;
	}

	.controls {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	img:hover {
		cursor: pointer;
	}
</style>
