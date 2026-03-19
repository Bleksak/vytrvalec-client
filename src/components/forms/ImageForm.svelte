<script lang="ts">
    import { uploadImage } from '$actions/Image';
    import Store from '$lib/enums/Stores';
    import type { ToastStore } from '$lib/stores/ToastStore.svelte';
    import LL from '$translations/i18n-svelte';
    import type { AxiosInstance } from 'axios';
    import { getContext } from 'svelte';

    let {
        imageUuid = $bindable(),
        imageUrl = $bindable(),
        disabled = false,
        id = undefined,
        api,
    }: {
        imageUuid: string | undefined | null;
        imageUrl?: string | null | undefined;
        disabled?: boolean;
        id?: string | undefined;
        api: AxiosInstance;
    } = $props();

    const toastStore = getContext<ToastStore>(Store.TOAST_STORE);

    let fileInput = $state<HTMLElement>();
    let dropzone = $state<HTMLElement>();
    let dropzoneImage = $state<HTMLImageElement>();
    let dropzoneText = $state<HTMLElement>();

    let uploadedFiles = $state<FileList>();

    const displayImage = (url: string) => {
        imageUrl = url;
        dropzoneImage!.src = url;
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

    const handleUploadImage = async (image: File) => {
        const response = await uploadImage(api, image);
        if (!response) {
            toastStore.add({
                type: 'error',
                message: 'Obrázek se nepodařilo nahrát',
            });
        } else {
            imageUuid = response.uuid;
            updateImagePreview(image);
        }
    };

    $effect(() => {
        if (uploadedFiles?.length !== undefined && uploadedFiles.length > 0) {
            handleUploadImage(uploadedFiles[0]);
        }
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

    const onUploadClick = (event: MouseEvent | KeyboardEvent) => {
        if (!disabled) {
            fileInput?.click();
            event.stopPropagation();
        }
    };

    $effect(() => {
        if (imageUrl && dropzoneImage) {
            displayImage(imageUrl);
        }
    });

    $effect(() => {
        // NOTE: tohle nejde nastavit na div pomoci HTML tak to musi byt tady

        if (!disabled) {
            dropzone?.addEventListener('dragenter', (e) => e.preventDefault());
            dropzone?.addEventListener('dragover', (e) => e.preventDefault());
            dropzone?.addEventListener('dragleave', (e) => e.preventDefault());
            dropzone?.addEventListener('drop', handleDrop);
        }
    });
</script>

<div
    class="dropzone"
    bind:this={dropzone}
    onclick={onUploadClick}
    onkeypress={onUploadClick}
    role="button"
    tabindex="0"
>
    <div class="inner" class:no-image={!imageUrl}>
        <img
            bind:this={dropzoneImage}
            src={imageUrl ?? '/images/icons/file-input-icon.svg'}
            alt="File input"
        />

        <div
            bind:this={dropzoneText}
            class="dropzone-text"
            style:display={imageUrl ? 'none' : 'block'}
        >
            {$LL.submission.form.image()}
        </div>

        {#if !disabled}
            <button class="secondary" type="button" onclick={onUploadClick}>
                {$LL.submission.form.chooseImage()}
            </button>
        {/if}
    </div>
</div>

<input bind:this={fileInput} bind:files={uploadedFiles} {id} type="file" accept="image/*" />

<style>
    .dropzone {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-block: 1.5rem;
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
        height: 100%;
    }

    img {
        max-height: 300px;
    }

    input[type='file'] {
        display: none;
    }
</style>
