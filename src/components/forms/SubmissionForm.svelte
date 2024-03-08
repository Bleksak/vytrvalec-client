<script lang="ts">
	import { fetchActivities } from '$actions/Activity';
	import Dialog from '$components/Dialog.svelte';
	import Button from '$components/Button.svelte';
	import LL from '$translations/i18n-svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import Select from '$components/FormComponent/Select.svelte';
	import type { SubmissionCreateError } from '$lib/DTO/SubmissionCreateResponse';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getContext } from 'svelte';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import { enhance } from '$app/forms';
	import { getGlobalContext } from '$lib/stores/GlobalContext.svelte';

	let { ...props } = $props<HTMLDialogAttributes>();

	const refetchSubmissions = getGlobalContext<() => void>('refetchSubmissions');

	let errors = $state<SubmissionCreateError>();

	let dialog = $state<Dialog>();

	let fileInput = $state<HTMLElement>();
	let dropzoneImage = $state<HTMLImageElement>();
	let dropzoneText = $state<HTMLElement>();

	let uploadedFiles = $state<FileList>();

	let imageUri = $state<string>();

	const displayImage = (uri: string) => {
		imageUri = uri;
		dropzoneImage!.src = uri;
		dropzoneImage!.style.display = 'block';
		dropzoneText!.style.display = 'none';
	};

	const updateImagePreview = (file: File) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			displayImage(reader.result as string);
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

	const onUploadClick = (event: MouseEvent) => {
		fileInput?.click();
		event.stopPropagation();
	};

	const toastStore = getContext<ToastStore>('toastStore');

	const onSubmit: SubmitFunction = ({ submitter }) => {
		submitter?.setAttribute('disabled', 'disabled');

		return async ({ result, update }) => {
			if (result.type === 'failure') {
				errors = result?.data?.submission as SubmissionCreateError;

				toastStore.add({
					type: 'error',
					message: $LL.submission.form.error()
				});
			} else if (result.type === 'success') {
				errors = undefined;
				dialog?.close();
				toastStore.add({
					type: 'success',
					message: $LL.submission.form.success()
				});

				if (refetchSubmissions) {
					refetchSubmissions();
				}
			}

			submitter?.removeAttribute('disabled');

			update();
		};
	};
</script>

<Dialog bind:this={dialog} header={$LL.submission.title()} {...props}>
	<form
		method="POST"
		action="/submission?/create"
		enctype="multipart/form-data"
		use:enhance={onSubmit}
	>
		<div
			class="dropzone"
			on:dragenter|preventDefault
			on:dragleave|preventDefault
			on:dragover|preventDefault
			on:drop|preventDefault={handleDrop}
			onclick={() => fileInput?.click()}
			on:keypress={() => fileInput?.click()}
			role="button"
			tabindex="0"
		>
			<div class="inner" class:no-image={!imageUri}>
				<img bind:this={dropzoneImage} src="/images/icons/file-input-icon.svg" alt="File input" />
				<div bind:this={dropzoneText} class="dropzone-text">
					{$LL.submission.form.image()}
				</div>

				<Button class="rounded small" type="button" onclick={onUploadClick}>
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
		{#each errors?.image ?? [] as error}
			<span class="error">
				{$LL.submission.form.errors.image[error as keyof typeof $LL.submission.form.errors.image]()}
			</span>
		{/each}

		<label for="distance">
			{$LL.submission.form.distance()} (km):
		</label>
		<input type="text" name="distance" id="distance" />
		{#each errors?.distance ?? [] as error}
			<span class="error">
				{$LL.submission.form.errors.distance[error as keyof typeof $LL.submission.form.errors.distance]()}
			</span>
		{/each}

		<label for="elevation">
			{$LL.submission.form.elevation()} (m):
		</label>
		<input type="text" name="elevation" id="elevation" />
		{#each errors?.elevation ?? [] as error}
			<span class="error">
				{$LL.submission.form.errors.elevation[error as keyof typeof $LL.submission.form.errors.elevation]()}
			</span>
		{/each}

		<label for="activity">
			{$LL.submission.form.activity()}:
		</label>
		{#await fetchActivities()}
			<span>Načítání</span>
		{:then activities}
			<Select
				name="activity"
				id="activity"
				keys={activities.map((a) => $LL.activities[a.name as keyof typeof $LL.activities]())}
				values={activities.map((a) => a.id)}
			/>
		{/await}

		<Button class="full-width rounded">
			{$LL.submission.form.submit()}
		</Button>
	</form>
</Dialog>

<style>
	.dropzone {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
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
