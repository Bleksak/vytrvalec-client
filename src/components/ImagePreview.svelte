<script lang="ts">
    import Dialog from '$components/Dialog.svelte';

    const { src, alt, title }: { src: string; title?: string; alt?: string } = $props();
</script>

<Dialog header={title ?? 'Náhled obrázku'}>
    <div class="image-wrapper">
        <img {title} {src} {alt} />
    </div>
</Dialog>

<style>
    .image-wrapper {
        display: flex;
    }

    .image-wrapper img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
</style>
