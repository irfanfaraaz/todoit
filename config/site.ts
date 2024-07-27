export type SiteConfig = typeof siteConfig;
import { Calendar, CalendarDays, Grid2X2, Inbox } from 'lucide-react';
export const siteConfig = {
  name: 'TodoIT',
  url: 'http://localhost:3000',
  ogImage: 'http://localhost:3000/og.jpg',
  creator: 'Syed Irfan Faraz',
  description: 'An advanced todo app',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
  ],
  primaryNavItems: [
    { id: 'primary', link: '/dashboard', icon: Inbox, name: 'Inbox' },
    { link: '/dashboard/today', icon: Calendar, name: 'Today' },
    { link: '/dashboard/upcoming', icon: CalendarDays, name: 'Upcoming' },
    {
      id: 'filters',
      link: '/dashboard/filter-labels',
      icon: Grid2X2,
      name: 'Filters',
    },
  ],
  links: {
    twitter: 'https://twitter.com/irfanfaraaz7',
    github: 'https://github.com/irfanfaraaz',
    docs: 'https://github.com/irfanfaraaz',
  },
};
