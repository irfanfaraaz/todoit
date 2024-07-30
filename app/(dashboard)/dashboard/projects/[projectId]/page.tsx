import DeleteProject from '@/components/projects/DeleteProject';
import { AddTaskWrapper } from '@/components/Tasks/AddTaskWrapper';
import CompletedTodos from '@/components/Todos/CompletedTodos';
import Todos from '@/components/Todos/Todos';
import { getProjectById } from '@/lib/actions/project.actions';
import { getTodosByProjectId } from '@/lib/actions/todo.actions';
import { labels, projects } from '@/lib/constants';
import { getCurrentUser } from '@/lib/session';

export default async function ProjectIdPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  console.log(projectId);

  const user = await getCurrentUser();
  const todos = await getTodosByProjectId({ projectId });

  const project = await getProjectById({ projectId });

  // console.log(todos);

  const completedTodosByProject = todos.filter((todo: any) => todo.isCompleted);

  const completedTodosTotal = completedTodosByProject.length;
  const inCompletedTodosByProject = todos.filter(
    (todo: any) => !todo.isCompleted,
  );

  const projectName = project?.name || '';

  return (
    <div className="px:10 md:px-20">
      <div className="flex flex-wrap items-center justify-between gap-2 lg:gap-0">
        <h1 className="text-lg font-semibold md:text-2xl">
          {projectName || 'Project'}
        </h1>
        <div className="flex items-center gap-6 lg:gap-12">
          <DeleteProject projectId={projectId} userId={user.id} />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <Todos items={inCompletedTodosByProject} />

        <div className="pb-6">
          <AddTaskWrapper
            userId={user.id}
            projects={projects}
            labels={labels}
            projectId={projectId}
          />
        </div>

        <Todos items={completedTodosByProject} />
        <div className="flex items-center gap-2 space-x-4  p-2 text-sm text-foreground/80">
          <CompletedTodos totalTodos={completedTodosTotal} />
        </div>
      </div>
    </div>
  );
}
