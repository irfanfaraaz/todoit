export type SiteConfig = typeof siteConfig;

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
  links: {
    twitter: 'https://twitter.com/irfanfaraaz7',
    github: 'https://github.com/irfanfaraaz',
    docs: 'https://github.com/irfanfaraaz',
  },
};
