<script lang="ts">
    import ActivityUpdateForm from '$components/administration/activity/ActivityUpdateForm.svelte';

    const { data } = $props();
</script>

<ActivityUpdateForm activity={data.activity} api={data.api} />
