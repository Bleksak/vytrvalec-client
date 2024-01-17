<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { date, name, id, minDate, maxDate, ...props } = $props<
		{ date: Date; name: string; id: string; minDate?: Date; maxDate?: Date } & HTMLInputAttributes
	>();

	const toString = (x: Date | undefined) => x?.toISOString().split('T')[0] ?? '';
	const fromString = (x: string) => new Date(x);

	let internal = $state(toString(date));

	$effect(() => {
		internal = toString(date);
	});
</script>

<input
	type="date"
	bind:value={internal}
	{name}
	{id}
	min={toString(minDate) || null}
	max={toString(maxDate) || null}
	on:change={() => (date = fromString(internal))}
	on:click|preventDefault={(e) => {
		e.target.showPicker();
	}}
	{...props}
/>
