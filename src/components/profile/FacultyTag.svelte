<script lang="ts">
    import { FacultyColorMap } from '$utils/colors';

    let { facultyShortcut }: { facultyShortcut: string } = $props();
</script>

<div
    style:background-color={FacultyColorMap[facultyShortcut as keyof typeof FacultyColorMap] ||
        FacultyColorMap['DEFAULT']}
    class="faculty-tag"
>
    <span>{facultyShortcut}</span>
</div>

<style>
    .faculty-tag {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1.2;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }

    span {
        line-height: 1.5rem;
        font-weight: bolder;
        font-size: 1.1rem;
        color: white;
    }
</style>
