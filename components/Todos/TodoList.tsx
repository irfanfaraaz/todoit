import { getAllUserTodos } from '@/lib/actions/todo.actions';
import { getCurrentUser } from '@/lib/session';
import CompletedTodos from './CompletedTodos';
import Todos from './Todos';
import { AddTaskWrapper } from '../Tasks/AddTaskWrapper';
import { getUserLabels } from '@/lib/actions/label.actions';
import { getUserProjects } from '@/lib/actions/project.actions';
// import { labels, projects } from '@/lib/constants';

export default async function TodoList() {
  const user = await getCurrentUser();
  // console.log(user);
  if (!user) {
    throw new Error('User not found');
  }
  const todos = await getAllUserTodos({ userId: user.id });
  const projects = await getUserProjects({ userId: user.id });
  const labels = await getUserLabels({ userId: user.id });

  const completedTodos = todos.filter((todo: any) => todo.isCompleted);
  const inCompleteTodos = todos.filter((todo: any) => !todo.isCompleted);

  return (
    <div className="px-10 md:px-20">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <Todos projects={projects} labels={labels} items={inCompleteTodos} />
      </div>
      <AddTaskWrapper projects={projects} labels={labels} userId={user.id} />
      <div className="flex flex-col gap-1 py-4">
        <Todos projects={projects} labels={labels} items={completedTodos} />
      </div>
      <CompletedTodos totalTodos={completedTodos.length} />
    </div>
  );
}
