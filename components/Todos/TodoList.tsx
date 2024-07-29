import { getAllUserTodos } from '@/lib/actions/todo.actions';
import { getCurrentUser } from '@/lib/session';
import CompletedTodos from './CompletedTodos';
import Todos from './Todos';
import { AddTaskWrapper } from '../Tasks/AddTaskWrapper';
import { getUserLabels } from '@/lib/actions/label.actions';
import { getUserProjects } from '@/lib/actions/project.actions';
import { labels, projects } from '@/lib/constants';

export default async function TodoList() {
  const user = await getCurrentUser();
  // console.log(user);
  if (!user) {
    throw new Error('User not found');
  }
  const todos = await getAllUserTodos({ userId: user.id });
  // const projects = await getUserProjects({ userId: user.id });
  // const labels = await getUserLabels({ userId: user.id });

  const completedTodos = todos.filter((todo: any) => todo.isCompleted);
  const inCompleteTodos = todos.filter((todo: any) => !todo.isCompleted);

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <Todos items={inCompleteTodos} />
      </div>
      <AddTaskWrapper projects={projects} labels={labels} />
      <div className="flex flex-col gap-1 py-4">
        <Todos items={completedTodos} />
      </div>
      <CompletedTodos totalTodos={completedTodos.length} />
    </div>
  );
}
