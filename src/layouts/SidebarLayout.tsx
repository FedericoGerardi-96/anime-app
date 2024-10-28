import { useEffect } from 'react';

import Cookies from 'js-cookie';

import { AppSidebar } from '@/components/shared/sidebar/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui';
import { getLangFromUrl } from '@/i18n/utils';

export default function SidebarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url) as string;

  useEffect(() => {
    return () => {
      if (!url.pathname.includes('/anime')) {
        Cookies.remove('year');
        Cookies.remove('season');
      }
    };
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href={`/${lang}/`}>Home</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Separator orientation='horizontal' />
        <div className='flex-1 h-full'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
