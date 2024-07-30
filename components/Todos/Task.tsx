import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { deleteTodoById, updateTodoById } from '@/lib/actions/todo.actions';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { format } from 'date-fns';
import { CalendarIcon, Edit3, GitBranch, Tag, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Task name must be at least 2 characters.',
  }),
  description: z.string().optional().default(''),
  dueDate: z
    .date({ required_error: 'A due date is required' })
    .transform((val) => new Date(val)),
});

export default function Task({
  data,
  isCompleted,
  handleOnChange,
  showDetails = false,
}: {
  data: any;
  isCompleted: boolean;
  handleOnChange: any;
  showDetails?: boolean;
}) {
  const { toast } = useToast();
  const { _id, title, description, dueDate, projectId, labelId } = data;
  const isOverdue = moment(dueDate).isBefore(moment(), 'day') && !isCompleted;
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title,
      description,
      dueDate: new Date(dueDate),
      projectId,
      labelId,
    },
  });

  const handleDelete = async () => {
    try {
      await deleteTodoById({ taskId: _id });
      toast({
        title: 'Successfully deleted a task!',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Failed to delete a task!',
        duration: 3000,
        variant: 'destructive',
      });
      console.error('Failed to delete todo', error);
    }
  };

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
    <div
      key={data._id}
      className="flex items-center space-x-2 border-b-2 border-gray-100 p-2 animate-in fade-in">
      <Dialog>
        <div className="flex w-full items-center justify-end gap-2">
          <div className="flex w-full gap-2">
            <Checkbox
              id="todo"
              className={clsx(
                'w-5 h-5 rounded-xl',
                isCompleted &&
                  'data-[state=checked]:bg-gray-300 border-gray-300',
              )}
              checked={isCompleted}
              onCheckedChange={handleOnChange}
            />
            <DialogTrigger asChild>
              <div className="flex flex-col items-start">
                <button
                  className={clsx(
                    'text-sm font-normal text-left',
                    isCompleted && 'line-through text-foreground/30',
                  )}>
                  {title}
                </button>
                <p className="text-xs text-foreground/70">{description}</p>
                <div className="flex items-center justify-center gap-1">
                  <CalendarIcon className="h-3 w-3 text-primary" />
                  <p
                    className={clsx(
                      'text-xs',
                      isOverdue ? 'text-red-500' : 'text-primary',
                      'text-[10px]', // Make date a bit smaller
                    )}>
                    {moment(dueDate).format('LL')}
                  </p>
                </div>
              </div>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-start gap-3">
            {isEditing ? (
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
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="mt-4 flex justify-end gap-2">
                    <Button
                      type="submit"
                      variant="outline"
                      className="flex gap-2">
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
            ) : (
              <>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-md text-foreground/70">Task: {title}</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <p className="text-xs text-primary">
                    {moment(dueDate).format('LL')}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <GitBranch className="h-4 w-4 text-foreground/70" />
                  <p className="text-sm text-foreground/70">{projectId.name}</p>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Tag className="h-4 w-4 text-foreground/70" />
                  <p className="text-sm text-foreground/70">{labelId.name}</p>
                </div>
              </>
            )}
          </div>
          {!isEditing && (
            <DialogFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="flex gap-2"
                onClick={() => setIsEditing(true)}>
                <Edit3 className="h-5 w-5" /> Edit
              </Button>
              <Button
                variant="destructive"
                className="flex gap-2"
                onClick={handleDelete}>
                <Trash2 className="h-5 w-5" /> Delete
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
