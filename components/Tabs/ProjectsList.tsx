import { Hash } from 'lucide-react';
import Link from 'next/link';
import { Label } from '../ui/label';
import AddProjectDialog from '../projects/AddProject';
import { getCurrentUser } from '@/lib/session';
import { getUserProjects } from '@/lib/actions/project.actions';

export default async function ProjectsList() {
  const user = await getCurrentUser();
  const projects = await getUserProjects({ userId: user.id });
  return (
    <div className="px-10 md:px-20">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
        <AddProjectDialog userId={user.id} />
      </div>
      <div className="flex flex-col gap-1 py-4">
        {projects?.map((project: any) => {
          return (
            <Link key={project._id} href={`/dashboard/projects/${project._id}`}>
              <div className="flex items-center space-x-2 border-b-2 border-gray-100 p-2">
                <Hash className="w-5 text-primary" />
                <Label
                  htmlFor="projects"
                  className="text-base font-normal hover:cursor-pointer">
                  {project.name}
                </Label>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
