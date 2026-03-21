import { onDestroy, onMount, tick } from 'svelte';
import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, closeAction: () => void) => {
    function handleClick(e: any) {
        if (!node.contains(e.target)) {
            closeAction();
        }
    }

    onMount(() => {
        tick().then(() => {
            window.addEventListener('click', handleClick);
        });
    });

    onDestroy(() => {
        window.removeEventListener('click', handleClick);
    });
};
