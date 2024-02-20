export type ToastStore = {
	add: (toast: Toast) => void;
	toasts: Array<Toast>;
	remove: (toast: Toast) => void;
};

export type Toast = {
	message: string;
	type: 'success' | 'error';
	timeout?: NodeJS.Timeout;
};

export const createToastStore = () => {
	let toasts = $state<Array<Toast>>([]);
	const timeout = 5000;

	const add = (toast: Toast) => {
		toasts.unshift(toast);

		toast.timeout = setTimeout(() => {
			toasts.pop();
		}, timeout);
	};

	const remove = (toast: Toast) => {
		clearTimeout(toast.timeout);
		toasts = toasts.filter((t) => t.timeout !== toast.timeout);
	};

	const all = () => toasts;

	return {
		add: add,
		toasts: all,
		remove: remove
	};
};
