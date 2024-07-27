import MobileNav from '@/components/mobile-sidebar-nav';
import { SidebarNav } from '@/components/sidebar-nav';
import { authOptions } from '@/lib/auth';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
export default async function DashboarDeciderPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return <></>;
}
