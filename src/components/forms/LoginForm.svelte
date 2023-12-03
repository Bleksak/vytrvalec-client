<script lang="ts">
	import Button from '$components/Button.svelte';
	import Dialog from '$components/Dialog.svelte';

	import { enhance } from '$app/forms';

	let dialog: Dialog | any = $state();

	export function open() {
		dialog.showModal();
	}
</script>

<Dialog bind:dialog>
	<div>
		<h5>Přihlášení</h5>

		<form method="POST" action="/?/login" use:enhance>
			<label for="email">
				E-mail:
				<input type="email" name="email" id="email" />
			</label>

			<label for="password">
				Heslo:
				<input type="password" name="password" id="password" />
			</label>

			<Button fullWidth>Přihlásit</Button>
		</form>
	</div>
</Dialog>

<style>
	div {
		width: 100%;
		display: flex;
		flex-direction: column;

		align-items: center;
		gap: 20px;
	}
</style>
