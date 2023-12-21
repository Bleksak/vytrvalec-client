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
		<h5>{$LL.submission.title()}</h5>

		<form method="POST" action="/submission/?/create" enctype="multipart/form-data" use:enhance>
			<label for="image">
				{$LL.submission.form.image()}:
				<input type="file" name="image" id="image" />
				{#each $page?.form?.email ?? [] as error}
					<span class="error">
						{$LL.submission.form.errors.image[error as keyof typeof $LL.submission.form.errors.image]()}
					</span>
				{/each}
			</label>

			<label for="distance">
				{$LL.submission.form.distance()}:
				<input type="distance" name="distance" id="distance" />
				{#each $page?.form?.distance ?? [] as error}
					<span class="error">
						{$LL.submission.form.errors.distance[error as keyof typeof $LL.submission.form.errors.distance]()}
					</span>
				{/each}
			</label>

			<label for="elevation">
				{$LL.submission.form.elevation()}:
				<input type="text" name="elevation" id="elevation" />
				{#each $page?.form?.first_name ?? [] as error}
					<span class="error">
						{$LL.submission.form.errors.elevation[error as keyof typeof $LL.submission.form.errors.elevation]()}
					</span>
				{/each}
			</label>
			<label for="activity">
				{$LL.submission.form.activity()}:
				<input type="text" name="activity" id="activity" />
				{#each $page?.form?.activity ?? [] as error}
					<span class="error">
						{$LL.submission.form.errors.activity[error as keyof typeof $LL.submission.form.errors.activity]()}
					</span>
				{/each}
			</label>

			<Button class="full-width">{$LL.submission.form.submit()}</Button>
		</form>
	</div>
</Dialog>
