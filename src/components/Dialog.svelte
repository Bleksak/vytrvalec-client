<script lang="ts">
	export let dialog: HTMLDialogElement;

	export function close() {
		dialog.close();
	}
</script>

<dialog bind:this={dialog}>
	<div class="wrapper">
		<div class="controls">
			<button on:click={close} type="button">
				<img src="/images/icons/close.svg" alt="Close" />
			</button>
		</div>
		<div class="inner">
			<slot />
		</div>
	</div>
</dialog>

<style>
	dialog[open] {
		top: 50%;
		left: 50%;
		-webkit-transform: translateX(-50%) translateY(-50%);
		-moz-transform: translateX(-50%) translateY(-50%);
		-ms-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);
	}

	div.wrapper {
		width: 500px;
		background-color: white;
		border-radius: 10px;
	}

	.controls {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		padding: 20px 20px 0;
	}

	img:hover {
		cursor: pointer;
	}

	div.inner {
		padding: 50px;
	}
</style>
