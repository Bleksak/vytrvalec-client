<script lang="ts">
	import Dialog from '$components/Dialog.svelte';
	import Button from '$components/Button.svelte';
	import LL from '$translations/i18n-svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	let dialog: Dialog | any = $state();
</script>

<Dialog bind:dialog>
	<div>
		<h5>{$LL.registration.title()}</h5>

		<form method="POST" action="?/submission" use:enhance>
			<label for="email">
				{$LL.registration.email()}:
				<input type="email" name="email" id="email" />
				{#each $page?.form?.email ?? [] as error}
					<span class="error"
						>{$LL.registration.errors.email[error as keyof typeof $LL.registration.errors.email]()}</span
					>
				{/each}
			</label>

			<label for="password">
				{$LL.registration.password()}:
				<input type="password" name="password" id="password" />
				{#each $page?.form?.password ?? [] as error}
					<span class="error"
						>{$LL.registration.errors.password[error as keyof typeof $LL.registration.errors.password]()}</span
					>
				{/each}
			</label>

			<label for="first_name">
				{$LL.registration.first_name()}:
				<input type="text" name="first_name" id="first_name" />
				{#each $page?.form?.first_name ?? [] as error}
					<span class="error"
						>{$LL.registration.errors.first_name[error as keyof typeof $LL.registration.errors.first_name]()}</span
					>
				{/each}
			</label>
			<label for="last_name">
				{$LL.registration.last_name()}:
				<input type="text" name="last_name" id="last_name" />
				{#each $page?.form?.last_name ?? [] as error}
					<span class="error"
						>{$LL.registration.errors.last_name[error as keyof typeof $LL.registration.errors.last_name]()}</span
					>
				{/each}
			</label>

			<Button class="full-width">{$LL.registration.submit()}</Button>
		</form>
	</div>
</Dialog>
