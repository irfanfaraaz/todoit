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
import { deleteLabel, updateLabel } from '@/lib/actions/label.actions';
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

export default function LabelActions({
  labelId,
  userId,
}: {
  labelId: any;
  userId: any;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteLabel({ labelId, userId });
      toast({
        title: 'Success',
        description: 'Label deleted',
      });
      router.push('/dashboard/labels');
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Failed to delete label',
      });
    }
  };

  const handleEdit = async (data: { name: string }) => {
    try {
      await updateLabel({ labelId, userId, name: data.name });
      toast({
        title: 'Success',
        description: 'Label updated',
      });
      setIsEditOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update label',
        variant: 'destructive',
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
              Label
            </button>
            <button onClick={() => setIsEditOpen(true)} className="flex gap-2">
              <Edit3 className="h-5 w-5 text-foreground/40" /> Edit Label
            </button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Label</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEdit)}>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Label Name" />
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
