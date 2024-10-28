import { atom } from 'nanostores';

export const openToast = atom(false);
export const toastMessage = atom('');
export const toastType = atom<"default" | "destructive" | null | undefined>('default');
export const toastTitle = atom('');
