<script lang="ts">
	export let dialog: HTMLDialogElement;

	export function close(e: Event) {
		if (e.target != dialog) return;
		dialog.close();
	}
</script>

<dialog bind:this={dialog} on:click={close}>
	<div>
		<slot />
	</div>
</dialog>

<style>
	dialog {
		top: 50%;
		left: 50%;
		-webkit-transform: translateX(-50%) translateY(-50%);
		-moz-transform: translateX(-50%) translateY(-50%);
		-ms-transform: translateX(-50%) translateY(-50%);
		transform: translateX(-50%) translateY(-50%);
	}

	div {
		width: 500px;
		padding: 50px;
		background-color: white;
		border-radius: 10px;
	}
</style>
