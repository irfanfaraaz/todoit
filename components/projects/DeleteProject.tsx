'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useToast } from '../ui/use-toast';
import { deleteProject } from '@/lib/actions/project.actions';
// import { GET_STARTED_PROJECT_ID } from '@/utils';

export default function DeleteProject({
  projectId,
  userId,
}: {
  projectId: any;
  userId: any;
}) {
  const form = useForm({ defaultValues: { name: '' } });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async () => {
    try {
      // if (projectId === GET_STARTED_PROJECT_ID) {
      //   toast.error('Cannot delete get started project');
      //   return;
      // }
      await deleteProject({ projectId, userId });
      toast({
        title: 'Success',
        description: 'Project deleted',
      });
      router.push('/dashboard/projects');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon className="h-5 w-5 text-foreground hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="w-40 lg:w-56">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <button type="submit" className="flex gap-2">
              <Trash2 className="h-5 w-5 rotate-45 text-foreground/40" /> Delete
              Project
            </button>
          </form>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
