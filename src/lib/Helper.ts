import { SvelteMap } from "svelte/reactivity";

export function createRecordFromEntityArray<T extends { id: number }>(
	entities: Array<T>
): SvelteMap<number, T> {
	const entityMap = new SvelteMap<number, T>();

	for (const entity of entities) {
		entityMap.set(entity.id, entity);
	}

	return entityMap;
}
