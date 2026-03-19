<script lang="ts">
    import ActivityCreateForm from '$components/administration/activity/ActivityCreateForm.svelte';

    let { data } = $props();
</script>

<ActivityCreateForm api={data.api} />
