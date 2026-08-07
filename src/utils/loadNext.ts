import type { Attachment } from 'svelte/attachments';

export const loadNext = (onIntersect: () => void | Promise<void>): Attachment => {
    return (element) => {
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                onIntersect();
            }
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    };
};
