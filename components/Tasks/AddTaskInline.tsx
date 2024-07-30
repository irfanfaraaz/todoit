import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { CalendarIcon, Text } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { CardFooter } from '../ui/card';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import moment from 'moment';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { createTodo } from '@/lib/actions/todo.actions';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Task name must be at least 2 characters.',
  }),
  description: z.string().optional().default(''),
  dueDate: z.date({ required_error: 'A due date is required' }),
  priority: z.string().min(1, { message: 'Please select a priority' }),
  projectId: z.string().min(1, { message: 'Please select a Project' }),
  labelId: z.string().min(1, { message: 'Please select a Label' }),
});

export default function AddTaskInline({
  setShowAddTask,
  userId,
  projects,
  labels,
  parentTask,
  projectId: myProjectId,
}: {
  userId?: string;
  projects?: any[];
  labels?: any[];
  setShowAddTask: Dispatch<SetStateAction<boolean>>;
  parentTask?: any;
  projectId?: any;
}) {
  const projectId =
    myProjectId || parentTask?.projectId || ('GET_STARTED_PROJECT_ID' as any);

  const labelId =
    parentTask?.labelId || ('k579xwsz7e2y73rxexkrg2f5j96tzt4f' as any);
  const priority = parentTask?.priority?.toString() || '1';
  const parentId = parentTask?._id;

  const { toast } = useToast();

  const defaultValues = {
    title: '',
    userId,
    description: '',
    priority,
    dueDate: new Date(),
    projectId: '',
    labelId: '',
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { title, description, priority, dueDate, projectId, labelId } = data;

    if (projectId) {
      const taskData = {
        title,
        userId,
        description,
        priority: parseInt(priority),
        dueDate: moment(dueDate).valueOf(),
        projectId: projectId as string,
        labelId: labelId as string,
      };

      await createTodo(taskData);
      toast({
        title: 'Task added 🎉',
        description: 'Your task has been added successfully. ✅',
      });
      setShowAddTask(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-2 space-y-2 rounded-xl border-2 border-foreground/20  p-2 px-3 pt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter your Task name"
                    required
                    className="border-0 text-lg font-semibold"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-start gap-2">
                    <Text className="ml-auto h-4 w-4 opacity-50" />
                    <Textarea
                      id="description"
                      placeholder="Description"
                      className="resize-none"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2">
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
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ''}
                    defaultValue={priority}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4].map((item, idx) => (
                        <SelectItem key={idx} value={item.toString()}>
                          Priority {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="labelId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ''}
                    defaultValue={labelId || field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Label" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {labels?.map((label: any, idx: number) => (
                        <SelectItem key={idx} value={label._id}>
                          {label?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ''}
                  defaultValue={projectId || field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects?.map((project: any, idx: number) => (
                      <SelectItem key={idx} value={project._id}>
                        {project?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <CardFooter className="flex flex-col gap-2 border-t-2 pt-3 lg:flex-row lg:justify-between">
            <div className="w-full lg:w-1/4"></div>
            <div className="flex gap-3 self-end">
              <Button
                className="bg-gray-300/40 px-6 text-gray-950 hover:bg-gray-300"
                variant={'outline'}
                onClick={() => setShowAddTask(false)}>
                Cancel
              </Button>
              <Button className="px-6" type="submit">
                Add task
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
}
