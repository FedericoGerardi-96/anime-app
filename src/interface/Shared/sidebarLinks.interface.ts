import type { LucideProps } from 'lucide-react';

export interface ISidebarLinks {
  teams: Team[];
  navMain: NavMain[];
  projects: Project[];
}

export interface NavMain {
  id: string;
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
  items: Item[];
}

export interface Item {
  title: string;
  url: string;
}

export interface Project {
  name: string;
  url: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
}

export interface Team {
  name: string;
  logo: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
  plan: string;
}
