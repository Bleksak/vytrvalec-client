import type { Attachment } from 'svelte/attachments';

export function multiPortal(selectors: Array<string | Element>): Attachment {
    return (element) => {
        let currentContainer: Element | undefined;

        function resolveContainer(): Element {
            for (const target of selectors) {
                if (typeof target === 'string') {
                    const el = document.querySelector(target);
                    if (el) {
                        return el;
                    }
                } else if (target.isConnected) {
                    return target;
                }
            }

            return document.body;
        }

        function attach() {
            const container = resolveContainer();
            if (container !== currentContainer) {
                if (currentContainer?.contains(element)) {
                    currentContainer.removeChild(element);
                }
                container.appendChild(element);
                currentContainer = container;
            }
        }

        attach();

        const observer = new MutationObserver(() => {
            attach();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            if (element.isConnected) {
                element.remove();
            }
        };
    };
}
