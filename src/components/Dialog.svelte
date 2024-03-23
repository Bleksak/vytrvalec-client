<script lang="ts">
	import Store from '$lib/enums/Stores';
	import type { DialogStore } from '$lib/stores/DialogStore.svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';

	let { dialog, header, children, ...props } : HTMLDialogAttributes & {
			dialog?: HTMLDialogElement;
			header: string;
			children: Snippet;
		} = $props();

	const dialogStore = getContext<DialogStore>(Store.DIALOG_STORE);

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

		<button onclick={close} type="button" class="close-button">
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
		/* -webkit-transform: translateX(-50%) translateY(-50%); */
		/* -moz-transform: translateX(-50%) translateY(-50%); */
		/* -ms-transform: translateX(-50%) translateY(-50%); */
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
		overflow-y: auto;
	}

	dialog::backdrop {
		transition: backdrop-filter 0.5s ease;
		background: rgba(0, 0, 0, 0.8);
	}

	.dialog-header {
		display: flex;
		justify-content: space-between;
	}

	.dialog-header,
	section {
		padding-inline: 30px;
		width: 90%;
		margin: 0 auto;
	}

	img:hover {
		cursor: pointer;
	}

    @media (max-width: 600px) {
        dialog {
            max-height: 90vh;
        }

        .close-button {
            padding: 6px;
        }
    }
</style>
