import type { SvelteComponent, ComponentType, ComponentProps } from 'svelte';

type Component = ComponentType<SvelteComponent>;

export type DialogStore = {
	open: <T extends SvelteComponent>(component: ComponentType<T>, props?: ComponentProps<T>) => void;
	close: () => void;
    props: () => ComponentProps<SvelteComponent>;
	current: () => Component | undefined;
};

const createDialogStore = (): DialogStore => {
	let currentDialog = $state<Component>();
    let currentProps = $state<ComponentProps<SvelteComponent>>({});

	const open = <T extends SvelteComponent>(component: ComponentType<T>, props: ComponentProps<T> | {} = {}) => {
        currentProps = props;
		currentDialog = component;
	};

	const close = () => {
		currentDialog = undefined;
        currentProps = {};
	};

	const current = () => currentDialog;
    const props = () => currentProps;

	return {
		open,
		close,
        props,
		current
	};
};

export default createDialogStore;
