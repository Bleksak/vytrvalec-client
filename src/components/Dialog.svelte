<script lang="ts">
  export let dialog: HTMLDialogElement;

  export function close() {
    dialog.close();
  }

</script>

<dialog bind:this={dialog}>
	<div>
		<button on:click={close} name="close">
			<img src="/images/icons/close.svg" alt="Close" />
		</button>
		<div class="inner">
			<slot />
		</div>
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
        background-color: white;
        border-radius: 10px;
    }

    button {
        float: right;
        margin: 20px;
    }

    img:hover {
        cursor: pointer;
    }

    .inner {
        padding: 50px;
    }
</style>
