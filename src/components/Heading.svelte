<script lang="ts">
    let { children } = $props();
</script>

<header>
    {@render children()}
</header>

<style>
    header {
        background-image: linear-gradient(to right, rgba(0, 92, 171, 0.1), transparent);
    }
</style>
