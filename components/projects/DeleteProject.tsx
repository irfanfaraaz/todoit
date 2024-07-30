'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisIcon, Trash2, Edit3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { deleteProject, updateProject } from '@/lib/actions/project.actions';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function ProjectActions({
  projectId,
  userId,
}: {
  projectId: any;
  userId: any;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    try {
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

  const handleEdit = async (data: { name: string }) => {
    try {
      await updateProject({ projectId, userId, name: data.name });
      toast({
        title: 'Success',
        description: 'Project updated',
      });
      setIsEditOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project',
      });
    }
  };

  const form = useForm({ defaultValues: { name: '' } });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisIcon className="h-5 w-5 text-foreground hover:cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex w-40 flex-col gap-3 lg:w-56">
            <button onClick={handleDelete} className="flex gap-2">
              <Trash2 className="h-5 w-5 rotate-45 text-foreground/40" /> Delete
              Project
            </button>
            <button onClick={() => setIsEditOpen(true)} className="flex gap-2">
              <Edit3 className="h-5 w-5 text-foreground/40" /> Edit Project
            </button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEdit)}>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Project Name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="mt-4" type="submit">
                Save
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
