<script lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';

	let { dialog, header, ...props } = $props<
		HTMLDialogAttributes & { dialog?: HTMLDialogElement; header: string }
	>();

	export function close() {
		dialog?.close();
	}

	$effect(() => {
		dialog?.showModal();
	});
</script>

<dialog bind:this={dialog} {...props} on:close>
	<header>
		<h5>{header}</h5>

		<button on:click={close} type="button">
			<img src="/images/icons/close.svg" alt="Close" />
		</button>
	</header>
	<section>
		<slot />
	</section>
</dialog>

<style>
	dialog[open] {
		top: 50%;
		left: 50%;
		-webkit-transform: translateX(-50%) translateY(-50%);
		-moz-transform: translateX(-50%) translateY(-50%);
		-ms-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);

		display: flex;
		flex-direction: column;
		max-width: 450px;
		width: 100%;
		background-color: white;
		border-radius: 10px;
		padding: 50px 30px;
		gap: 20px;
	}

	dialog::backdrop {
		transition: backdrop-filter 0.5s ease;
		background: rgba(0, 0, 0, 0.8);
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	header,
	section {
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
