<script lang="ts">
	import Dialog from '$components/Dialog.svelte';
	import Button from '$components/Button.svelte';
	import LL from '$translations/i18n-svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { ChangeEventHandler } from 'svelte/elements';

	let dialog: Dialog | any = $state();
	let dropzone: HTMLElement | any = $state();
	let dropzoneImage: HTMLImageElement | any = $state();
	let dropzoneText: HTMLElement | any = $state();

	let uploadedFiles: FileList | any = $state();

	export function open() {
		dialog.showModal();
	}

	const preventDefault = (e: Event) => {
		e.preventDefault();
	};

	const updateImagePreview = (file: File) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			dropzoneImage.src = reader.result as string;
			dropzoneImage.style.display = 'block';
			dropzoneText.style.display = 'none';
		};
	};

	const fileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.currentTarget.files?.length !== undefined) {
			updateImagePreview(e.currentTarget.files[0]);
		}
	};

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

	$effect(() => {
		dropzone.addEventListener('dragenter', preventDefault, false);
		dropzone.addEventListener('dragleave', preventDefault, false);
		dropzone.addEventListener('dragover', preventDefault, false);
		dropzone.addEventListener('drop', handleDrop, false);
	});
</script>

<Dialog bind:dialog>
	<div>
		<h5>{$LL.submission.title()}</h5>

		<form method="POST" action="/submission/?/create" enctype="multipart/form-data" use:enhance>
			<label for="image">
				<div class="dropzone" bind:this={dropzone}>
					<img bind:this={dropzoneImage} alt="Activity" class="dropzone-image" />
					<div bind:this={dropzoneText} class="dropzone-text">
						{$LL.submission.form.image()}
					</div>
				</div>
				<input
					bind:files={uploadedFiles}
					on:change={fileInputChange}
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
			</label>

			<label for="distance">
				{$LL.submission.form.distance()}:
				<input type="text" name="distance" id="distance" />
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

<style>
	.dropzone {
		display: flex;
		justify-content: center;
		align-items: center;

		width: 300px;
		height: 400px;
		border: 1px solid gray;
		border-radius: 10px;
		margin: 15px auto;
	}

	.dropzone-image {
		display: none;
		width: 100%;
		height: 100%;
	}

	.dropzone-text {
		width: 60%;
		text-align: center;
	}

	input[type='file'] {
		display: none;
	}
</style>
