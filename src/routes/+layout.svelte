<script lang="ts">
	String.prototype.removeAccents = function () {
		return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	};
</script>

<slot />
