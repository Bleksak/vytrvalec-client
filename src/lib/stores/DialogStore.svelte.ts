import type { SvelteComponent, ComponentType, ComponentProps } from 'svelte';
import { hydrate, unmount } from 'svelte';

export type DialogStore = {
	open: <T extends SvelteComponent>(
		component: ComponentType<T>,
		props?: ComponentProps<T>,
		context?: Map<string, any>
	) => void;
	close: () => void;
};

const createDialogStore = (): DialogStore => {
	let currentDialog: Record<string, any> | undefined = undefined;

	const open = <T extends SvelteComponent>(
		component: ComponentType<T>,
		props: Record<string, any> = {},
		context?: Map<string, any>
	) => (currentDialog = hydrate(component, { props, target: document.body, context }));

	const close = () => unmount(currentDialog!);

	return {
		open,
		close
	};
};

export default createDialogStore;
