import { SvelteMap } from 'svelte/reactivity';

const globalContext = $state<SvelteMap<string, any>>(new SvelteMap());

export const setGlobalContext = <T>(key: string, value: T) => {
    globalContext.set(key, value);
};

export const getGlobalContext = <T>(key: string): T | undefined => {
    return globalContext.get(key) as T;
};
