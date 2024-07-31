import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { CalendarIcon } from 'lucide-react';
import { updateTodoById } from '@/lib/actions/todo.actions';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Task name must be at least 2 characters.',
  }),
  description: z.string().optional().default(''),
  dueDate: z
    .date({ required_error: 'A due date is required' })
    .transform((val) => new Date(val)),
  projectId: z.string().optional().nullable(),
  labelId: z.string().optional().nullable(),
});

export default function EditTask({
  data,
  projects,
  labels,
  setIsEditing,
}: {
  data: any;
  projects?: any[];
  labels?: any[];
  setIsEditing: (isEditing: boolean) => void;
}) {
  const { toast } = useToast();
  const { _id, title, description, dueDate, projectId, labelId } = data;

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title,
      description,
      dueDate: new Date(dueDate),
      projectId: projectId?._id || null,
      labelId: labelId?._id || null,
    },
  });

  const handleEdit = async (data: any) => {
    try {
      await updateTodoById({ taskId: _id, updateData: data });
      toast({
        title: 'Successfully updated the task!',
        variant: 'default',
        duration: 3000,
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Failed to update the task!',
        variant: 'destructive',
        duration: 3000,
      });
      console.error('Failed to update todo', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleEdit)}
        className="flex w-full flex-col gap-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="title"
                  type="text"
                  placeholder="Task title"
                  required
                  className="text-md  font-semibold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Task description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'flex w-[240px] gap-2 pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}>
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects?.map((project: any) => (
                      <SelectItem key={project._id} value={project._id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="labelId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a label" />
                  </SelectTrigger>
                  <SelectContent>
                    {labels?.map((label: any) => (
                      <SelectItem key={label._id} value={label._id}>
                        {label.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button type="submit" variant="outline" className="flex gap-2">
            Save
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="flex gap-2"
            onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
