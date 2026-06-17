export const CMS_CHANGED_EVENT = 'cms:changed';

export function notifyCmsChanged(): void {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new Event(CMS_CHANGED_EVENT));
}
