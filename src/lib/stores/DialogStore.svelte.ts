import type { ComponentProps, Component } from 'svelte';
import { hydrate, mount, unmount } from 'svelte';

export type DialogStore = {
	open: <T extends Component>(
		component: Component<T>,
		props?: ComponentProps<T>,
		context?: Map<string, any>
	) => void;
	close: () => void;
};

const createDialogStore = (): DialogStore => {
	let currentDialog: Record<string, any> | undefined = undefined;

	const open = <T extends Component>(
		component: Component<T>,
		props: Record<string, any> = {},
		context: Map<string, any> = new Map()
	) => {
		if (currentDialog) {
			unmount(currentDialog);
		}

		currentDialog = mount(component, {
			props,
			target: document.body,
			context
		});
	}


	const close = () => {
		if (currentDialog) {
			unmount(currentDialog);
			currentDialog = undefined;
		}
	}

	return {
		open,
		close
	};
};

export default createDialogStore;