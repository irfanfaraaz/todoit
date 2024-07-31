import { deleteTodoById } from '@/lib/actions/todo.actions';
import clsx from 'clsx';
import { CalendarIcon, Edit3, GitBranch, Tag, Trash2 } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import EditTask from './EditTask';

export default function Task({
  data,
  isCompleted,
  projects,
  labels,
  handleOnChange,
  showDetails = false,
}: {
  data: any;
  isCompleted: boolean;
  projects?: any[];
  labels?: any[];
  handleOnChange: any;
  showDetails?: boolean;
}) {
  const { toast } = useToast();
  const { _id, title, description, dueDate, projectId, labelId } = data;
  const isOverdue = moment(dueDate).isBefore(moment(), 'day') && !isCompleted;
  const [isEditing, setIsEditing] = useState(false);

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
              <EditTask
                data={data}
                projects={projects}
                labels={labels}
                setIsEditing={setIsEditing}
              />
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
                {projectId && (
                  <div className="flex items-center justify-center gap-1">
                    <GitBranch className="h-4 w-4 text-foreground/70" />
                    <p className="text-sm text-foreground/70">
                      {projectId.name}
                    </p>
                  </div>
                )}
                {labelId && (
                  <div className="flex items-center justify-center gap-1">
                    <Tag className="h-4 w-4 text-foreground/70" />
                    <p className="text-sm text-foreground/70">{labelId.name}</p>
                  </div>
                )}
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
