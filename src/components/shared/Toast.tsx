import { useEffect } from 'react';

import { Toaster } from '../ui/toaster';
import { useStore } from '@nanostores/react';
import { openToast, toastMessage, toastTitle, toastType } from '@/store';
import { toast } from '@/hooks/use-toast';

export const Toast = () => {
  const $openToast = useStore(openToast);
  const $toastMessage = useStore(toastMessage);
  const $toastType = useStore(toastType);
  const $toastTitle = useStore(toastTitle);

  useEffect(() => {
    if (!$openToast) return;
    
    toast({
      variant: $toastType,
      title: $toastTitle,
      description: $toastMessage,
    });
    openToast.set(false);
  }, [$openToast]);

  return (
    <>
      <Toaster />
    </>
  );
};
