import type { Component, MountOptions } from 'svelte';
import { mount, unmount } from 'svelte';

type BaseProps = {
    onclose?: (e: Event) => void;
};

export type DialogStore = {
    open: <Props extends BaseProps & Record<string, unknown>>(
        component: Component<Props>,
        props: object extends Props ? Partial<Props> : Props,
        context: Map<unknown, unknown>,
    ) => void;
    close: () => void;
};

const createDialogStore = (): DialogStore => {
    let currentDialog: Record<string, unknown> | undefined = undefined;

    const open = <Props extends Record<string, unknown>>(
        component: Component<Props>,
        props: object extends Props ? Partial<Props> : Props,
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
