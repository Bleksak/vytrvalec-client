<script lang="ts">
    import CharityCreateForm from '$components/administration/charity/CharityCreateForm.svelte';

    const { data } = $props();
</script>

<CharityCreateForm api={data.api} />
