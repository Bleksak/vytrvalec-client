import type { SvelteComponent, ComponentType } from 'svelte';

type Component = ComponentType<SvelteComponent>;

export type DialogStore = {
	open: (component: Component ) => void;
	close: () => void;

	current: () => Component | undefined;
};

const createDialogStore = (): DialogStore => {
	let currentDialog = $state<Component>();

	const open = (component: Component) => {
		currentDialog = component;
	};

	const close = () => {
		currentDialog = undefined;
	};

	const current = () => currentDialog;

	return {
		open,
		close,
		current
	};
};

export default createDialogStore;
