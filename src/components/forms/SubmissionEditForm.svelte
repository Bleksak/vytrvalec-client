<script lang="ts">
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import type { SubmissionCreateError } from '$lib/DTO/SubmissionCreateResponse';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ToastStore } from '$lib/stores/ToastStore.svelte';
	import type { ProfileSubmissionResponseDTO } from '$lib/DTO/SubmissionDTO';
	import Dialog from '$components/Dialog.svelte';
	import Button from '$components/Button.svelte';
	import Select from '$components/FormComponent/Select.svelte';
	import LL from '$translations/i18n-svelte';
	import { fetchActivities } from '$actions/Activity';
	import { getContext } from 'svelte';
	import { enhance } from '$app/forms';
	import { getGlobalContext } from '$lib/stores/GlobalContext.svelte';
	import Store from '$lib/enums/Stores';

	let { submission, disabled, ...props } : {
			submission: ProfileSubmissionResponseDTO;
			disabled?: boolean;
		} & HTMLDialogAttributes = $props();

	const activitiesPromise = fetchActivities();

	const refetchSubmissions = getGlobalContext<() => void>('refetchSubmissions');

	let errors = $state<SubmissionCreateError>();

	let dialog = $state<Dialog>();

	let fileInput = $state<HTMLElement>();
	let dropzoneImage = $state<HTMLImageElement>();
	let dropzoneText = $state<HTMLElement>();

	let uploadedFiles = $state<FileList>();

	let dropzone = $state<HTMLElement>();

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
		if (!uploadedFiles?.length) {
			displayImage(submission.image);
		} else {
			updateImagePreview(uploadedFiles[0]);
		}
	});

	$effect(() => {
		// NOTE: tohle nejde nastavit na div pomoci HTML tak to musi byt tady
		dropzone?.addEventListener('dragenter', (e) => e.preventDefault());
		dropzone?.addEventListener('dragover', (e) => e.preventDefault());
		dropzone?.addEventListener('dragleave', (e) => e.preventDefault());
		dropzone?.addEventListener('drop', handleDrop);
	});

	const handleDrop = (e: DragEvent) => {
		e.preventDefault();

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

	const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

	const onSubmit: SubmitFunction = ({ submitter }) => {
		submitter?.setAttribute('disabled', 'disabled');

		return async ({ result, update }) => {
			if (result.type === 'failure') {
				errors = result?.data?.submission as SubmissionCreateError;

				toastStore.add({
					type: 'error',
					message: $LL.submission.form.editErrorToast()
				});
			} else if (result.type === 'success') {
				errors = undefined;
				dialog?.close();
				toastStore.add({
					type: 'success',
					message: $LL.submission.form.editSuccessToast()
				});

				if (refetchSubmissions) {
					refetchSubmissions();
				}
			}

			submitter?.removeAttribute('disabled');

			update();
		};
	};

	const handleSelectImageClick = () => {
		if(!disabled) {
			fileInput?.click()
		}
	}

</script>

<Dialog bind:this={dialog} header={$LL.submission.editingTitle()} {...props}>
	<form
		method="POST"
		action="/submission?/patch"
		enctype="multipart/form-data"
		use:enhance={onSubmit}
	>
		<input type="hidden" name="id" value={submission.id} />
		<input type="hidden" name="updated_at" value={submission.updated_at} />
		{#if submission.message}
			<p>{$LL.submission.form.comment()}:</p>
			<span>{submission.message}</span>
		{/if}
		<div
			bind:this={dropzone}
			class="dropzone"
			class:disabled={disabled}
			onclick={handleSelectImageClick}
			onkeypress={handleSelectImageClick}
			role="button"
			tabindex="0"
		>
			<div class="inner" class:no-image={!imageUri}>
				<img bind:this={dropzoneImage} src="/images/icons/file-input-icon.svg" alt="File input" />
				<div bind:this={dropzoneText} class="dropzone-text">
					{$LL.submission.form.image()}
				</div>

				{#if !disabled}
					<Button type="button" onclick={onUploadClick}>
						{$LL.submission.form.chooseImage()}
					</Button>
				{/if}
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
		<input type="text" name="distance" id="distance" disabled={disabled} value={submission.distance / 1000} />
		{#each errors?.distance ?? [] as error}
			<span class="error">
				{$LL.submission.form.errors.distance[error as keyof typeof $LL.submission.form.errors.distance]()}
			</span>
		{/each}

		<label for="elevation">
			{$LL.submission.form.elevation()} (m):
		</label>
		<input type="text" name="elevation" id="elevation" disabled={disabled} value={submission.elevation} />
		{#each errors?.elevation ?? [] as error}
			<span class="error">
				{$LL.submission.form.errors.elevation[error as keyof typeof $LL.submission.form.errors.elevation]()}
			</span>
		{/each}

		<label for="activity">
			{$LL.submission.form.activity()}:
		</label>
		{#await activitiesPromise}
			<span>Načítání</span>
		{:then activities}
			<Select
				name="activity"
				id="activity"
				keys={activities.map((a) => $LL.activities[a.name as keyof typeof $LL.activities]())}
				values={activities.map((a) => a.id)}
				currentValue={submission.activity.id}
				disabled={disabled}
			/>
		{/await}

		{#if !disabled}
			<Button>
				{$LL.submission.form.edit()}
			</Button>
		{/if}
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
