<script lang="ts">
	import { fetchActivities } from '$actions/Activity';
	import Dialog from '$components/Dialog.svelte';
	import Button from '$components/Button.svelte';
	import LL from '$translations/i18n-svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import Select from '$components/FormComponent/Select.svelte';

	let { ...props } = $props<HTMLDialogAttributes>();

	const activitesPromise = fetchActivities();

	let dialog = $state<Dialog>();

	let fileInput = $state<HTMLElement>();
	let dropzoneImage = $state<HTMLImageElement>();
	let dropzoneText = $state<HTMLElement>();

	let uploadedFiles = $state<FileList>();

	const updateImagePreview = (file: File) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			dropzoneImage!.src = reader.result as string;
			dropzoneImage!.style.display = 'block';
			dropzoneText!.style.display = 'none';
		};
	};

	$effect(() => {
		if (uploadedFiles?.length !== undefined) {
			updateImagePreview(uploadedFiles[0]);
		}
	});

	const handleDrop = (e: DragEvent) => {
		const dt = e.dataTransfer;
		if (dt === null) {
			return;
		}

		const files = dt.files;
		if (files.length === 0) {
			return;
		}

		const file = files[0];

		let fileList = new DataTransfer();
		fileList.items.add(file);
		uploadedFiles = fileList.files;

		updateImagePreview(file);
	};
	// TODO: po uploadu zavrit dialog, zobrazit hlasku, errory
</script>

<Dialog bind:this={dialog} header={$LL.submission.title()} {...props}>
	<form method="POST" action="/submission/?/create" enctype="multipart/form-data" use:enhance>
		<div
			class="dropzone"
			on:dragenter|preventDefault
			on:dragleave|preventDefault
			on:dragover|preventDefault
			on:drop|preventDefault={handleDrop}
			on:click={() => fileInput?.click()}
			on:keypress={() => fileInput?.click()}
			role="button"
			tabindex="0"
		>
			<div class="inner" class:no-image={!uploadedFiles}>
				<img bind:this={dropzoneImage} src="/images/icons/file-input-icon.svg" alt="File input" />
				<div bind:this={dropzoneText} class="dropzone-text">
					{$LL.submission.form.image()}
				</div>

				<Button class="rounded small" type="button" on:click={() => fileInput?.click()}>
					{$LL.submission.form.chooseImage()}
				</Button>
			</div>
		</div>

		<input
			bind:this={fileInput}
			bind:files={uploadedFiles}
			type="file"
			name="image"
			id="image"
			accept="image/*"
		/>
		{#each $page?.form?.email ?? [] as error}
			<span class="error">
				{$LL.submission.form.errors.image[error as keyof typeof $LL.submission.form.errors.image]()}
			</span>
		{/each}

		<label for="distance">
			{$LL.submission.form.distance()}:
		</label>
		<input type="text" name="distance" id="distance" />
		{#each $page?.form?.distance ?? [] as error}
			<span class="error">
				{$LL.submission.form.errors.distance[error as keyof typeof $LL.submission.form.errors.distance]()}
			</span>
		{/each}

		<label for="elevation">
			{$LL.submission.form.elevation()}:
		</label>
		<input type="text" name="elevation" id="elevation" />
		{#each $page?.form?.first_name ?? [] as error}
			<span class="error">
				{$LL.submission.form.errors.elevation[error as keyof typeof $LL.submission.form.errors.elevation]()}
			</span>
		{/each}

		<label for="activity">
			{$LL.submission.form.activity()}:
		</label>
		{#await activitesPromise then activities}
			<Select
				name="activity"
				id="activity"
				keys={activities.map((a) => a.name)}
				values={activities.map((a) => a.id)}
			/>
		{/await}
		{#each $page?.form?.activity ?? [] as error}
			<span class="error">
				{$LL.submission.form.errors.activity[error as keyof typeof $LL.submission.form.errors.activity]()}
			</span>
		{/each}

		<Button class="full-width rounded">{$LL.submission.form.submit()}</Button>
	</form>
</Dialog>

<style>
	.dropzone {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		/* margin: 15px auto; */
	}

	.no-image {
		padding: 15px;
		border: 2px solid #8099b44d;
		border-radius: 10px;
	}

	.no-image > img {
		height: 50px;
		width: 50px;
	}

	.dropzone-text {
		width: 60%;
		text-align: center;
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		gap: 15px;
	}

	img {
		max-height: 300px;
	}

	input[type='file'] {
		display: none;
	}
</style>
