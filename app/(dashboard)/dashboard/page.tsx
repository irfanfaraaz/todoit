// 'use client';
import TodoList from '@/components/Todos/TodoList';
import { authOptions } from '@/lib/auth';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login');
  }

  return (
    <div>
      <TodoList />
    </div>
  );
}
