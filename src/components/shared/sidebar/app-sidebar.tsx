import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import Cookies from 'js-cookie';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, Separator } from '@/components/ui';
import { ModeToggle, NavMain, NavUser, TeamSwitcher } from '@/components/shared';
import { getLangFromUrl, useTranslations } from '@/i18n/utils';
import type { ISidebarLinks } from '@/interface';

const getSidebarData = (): ISidebarLinks => {
  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url) as string;
  const t = useTranslations(lang);

  return {
    teams: [
      {
        name: 'Acme Inc',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: Command,
        plan: 'Free',
      },
    ],
    navMain: [
      {
        id: crypto.randomUUID(),
        title: 'Anime',
        url: `/${lang ?? 'es'}/anime`,
        icon: SquareTerminal,
        items: [
          {
            title: 'Home',
            url: `/${lang ?? 'es'}/anime`,
          },
          {
            title: 'Season',
            url: `/${lang ?? 'es'}/anime/season/1`,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: 'Manga',
        url: `/${lang ?? 'es'}/manga`,
        icon: Bot,
        items: [
          {
            title: 'Home',
            url: `/${lang ?? 'es'}/manga`,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: t('nav.link3'),
        url: `/${lang ?? 'es'}/favorites`,
        icon: BookOpen,
        items: [
          {
            title: 'Home',
            url: `/${lang ?? 'es'}/favorites`,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        title: t('nav.link4'),
        url: `/${lang ?? 'es'}/anime`,
        icon: Settings2,
        items: [
          {
            title: 'Home',
            url: `/${lang ?? 'es'}/calendar`,
          },
        ],
      },
    ],
    projects: [
      {
        name: 'Design Engineering',
        url: '#',
        icon: Frame,
      },
      {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChart,
      },
      {
        name: 'Travel',
        url: '#',
        icon: Map,
      },
    ],
  };
};

const getUser = (): User | null => {
  const user = JSON.parse(Cookies.get('userProfile') ?? '{}');


  if (!user) return null;

  return {
    name: user.name,
    email: user.email,
    avatar: user?.avatar ?? null,
    emailVerified: user.emailVerified,
  };
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = getSidebarData();
  const user = getUser();
  
  return (
    <Sidebar title='Tracker' collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className='justify-between'>
        <NavMain items={data.navMain} />
        <div className='px-4 mb-14'>
          <Separator orientation='horizontal' className='my-4' />
          <h3>Modo</h3>
          <div className='w-full flex items-center justify-start mt-5'>
            <ModeToggle />
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
