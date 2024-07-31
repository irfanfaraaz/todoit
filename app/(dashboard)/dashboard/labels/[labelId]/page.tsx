import LabelActions from '@/components/labels/LabelActions';
import { AddTaskWrapper } from '@/components/Tasks/AddTaskWrapper';
import CompletedTodos from '@/components/Todos/CompletedTodos';
import Todos from '@/components/Todos/Todos';
import { getLabelById, getUserLabels } from '@/lib/actions/label.actions';
import { getUserProjects } from '@/lib/actions/project.actions';
import { getTodosByLabelId } from '@/lib/actions/todo.actions';
// import { labels, projects } from '@/lib/constants';
import { getCurrentUser } from '@/lib/session';

export default async function LabelIdPage({
  params,
}: {
  params: { labelId: string };
}) {
  const { labelId } = params;

  const user = await getCurrentUser();
  const todos = await getTodosByLabelId({ labelId });

  const projects = await getUserProjects({ userId: user.id });
  const labels = await getUserLabels({ userId: user.id });

  const label = await getLabelById({ labelId });

  // console.log(todos);

  const completedTodosByLabel = todos.filter((todo: any) => todo.isCompleted);

  const completedTodosTotal = completedTodosByLabel.length;
  const inCompletedTodosByLabel = todos.filter(
    (todo: any) => !todo.isCompleted,
  );

  const labelName = label?.name || '';

  return (
    <div className="px:10 md:px-20">
      <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-0">
        <h1 className="text-lg font-semibold md:text-2xl">
          {labelName || 'Label'}
        </h1>
        <div className="flex items-center gap-6 lg:gap-12">
          <LabelActions labelId={labelId} userId={user.id} />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <Todos
          projects={projects}
          labels={labels}
          items={inCompletedTodosByLabel}
        />

        <div className="pb-6">
          <AddTaskWrapper
            userId={user.id}
            projects={projects}
            labels={labels}
            labelId={labelId}
          />
        </div>

        <Todos
          projects={projects}
          labels={labels}
          items={completedTodosByLabel}
        />
        <div className="flex items-center gap-2 space-x-4  p-2 text-sm text-foreground/80">
          <CompletedTodos totalTodos={completedTodosTotal} />
        </div>
      </div>
    </div>
  );
}
