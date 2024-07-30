import MobileNav from '@/components/nav/mobile-sidebar-nav';
import { SidebarNav } from '@/components/nav/sidebar-nav';
import { getUserProjects } from '@/lib/actions/project.actions';
import { getCurrentUser } from '@/lib/session';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard example using Next.js 14',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: SettingsLayoutProps) {
  const user = await getCurrentUser();
  const projects = await getUserProjects({ userId: user.id });
  return (
    <>
      <div className="flex-1 ">
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <SidebarNav projectList={projects} userId={user.id} />
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
