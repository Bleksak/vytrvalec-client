import type { Component, MountOptions } from 'svelte';
import { mount, unmount } from 'svelte';

export type DialogStore = {
    open: <Props extends object>(
        component: Component<Props>,
        props: Props,
        context: Map<unknown, unknown>,
    ) => void;
    close: () => void;
};

const createDialogStore = (): DialogStore => {
    let currentDialog: Record<string, unknown> | undefined = undefined;

    const open = <Props extends object>(
        component: Component<Props>,
        props: Props,
        context: Map<unknown, unknown> = new Map(),
    ) => {
        if (currentDialog) {
            unmount(currentDialog);
        }

        const options: MountOptions<Props> = {
            props: props as Props,
            target: document.body as Document | Element | ShadowRoot,
            context,
        };

        currentDialog = mount(component, options);
    };

    const close = () => {
        if (currentDialog) {
            unmount(currentDialog);
            currentDialog = undefined;
        }
    };

    return {
        open,
        close,
    };
};

export default createDialogStore;
