'use client';
import { PlusIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { createProject } from '@/lib/actions/project.actions';
import { getCurrentUser } from '@/lib/session';
import { useState } from 'react';

export default function AddProjectDialog({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger id="closeDialog">
        <PlusIcon className="h-5 w-5" aria-label="Add a Project" />
      </DialogTrigger>
      <AddProjectDialogContent userId={userId} onClose={handleDialogClose} />
    </Dialog>
  );
}

function AddProjectDialogContent({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const form = useForm({ defaultValues: { name: '' } });
  const { toast } = useToast();

  const onSubmit = async ({ name }: any) => {
    console.log('submitted', { name });

    const projectId = await createProject({ name, userId });

    if (projectId !== undefined) {
      toast({
        title: '🚀 Successfully created a project!',
        duration: 3000,
      });
      form.reset({ name: '' });
      onClose();
    }
  };

  return (
    <DialogContent className="flex max-w-xl flex-col text-right md:flex-row lg:h-56 lg:justify-between">
      <DialogHeader className="w-full">
        <DialogTitle>Add a Project</DialogTitle>
        <DialogDescription className="capitalize">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-2 space-y-2 rounded-sm border-2 border-foreground/20  p-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Project name"
                        required
                        className="border-0 text-lg font-semibold"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}></FormField>
              <Button className="">Add</Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
