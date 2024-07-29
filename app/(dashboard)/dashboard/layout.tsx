import MobileNav from '@/components/mobile-sidebar-nav';
import { SidebarNav } from '@/components/sidebar-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard example using Next.js 14',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="flex-1 xl:max-w-6xl">
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <SidebarNav />
          <div className="flex flex-col">
            <MobileNav />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
