<script lang="ts">
	import Dialog from '$components/Dialog.svelte';
	import Button from '$components/Button.svelte';
	import LL from '$translations/i18n-svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { ChangeEventHandler } from 'svelte/elements';

	let dialog: Dialog | any = $state<Dialog>();
	let fileInput: HTMLElement | any = $state<HTMLElement>();
	let dropzone: HTMLElement | any = $state<HTMLElement>();
	let dropzoneImage: HTMLImageElement | any = $state<HTMLImageElement>();
	let dropzoneText: HTMLElement | any = $state<HTMLElement>();

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
			<div class="dropzone" bind:this={dropzone}>
				<div class="inner" class:no-image={!uploadedFiles}>
					<img bind:this={dropzoneImage} src="/images/icons/file-input-icon.svg" alt="File input" />
					<div bind:this={dropzoneText} class="dropzone-text">
						{$LL.submission.form.image()}
					</div>

					<Button class="rounded small" type="button" on:click={() => fileInput.click()}>
						<!-- TODO: translations -->
						Vybrat obrázek
					</Button>
				</div>
			</div>

			<input
				bind:this={fileInput}
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

			<Button class="full-width rounded">{$LL.submission.form.submit()}</Button>
		</form>
	</div>
</Dialog>

<style>
	.dropzone {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: 15px auto;
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
		width: 90%;
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
