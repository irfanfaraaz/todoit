import clsx from 'clsx';
// import AddTaskDialog from '../add-tasks/add-task-dialog';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { Calendar, GitBranch, Tag } from 'lucide-react';
import moment from 'moment';

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
  const { title, description, dueDate } = data;
  const isOverdue = moment(dueDate).isBefore(moment(), 'day');

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
                  <Calendar className="h-3 w-3 text-primary" />
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
          {/* {!isSubTodo(data) && <AddTaskDialog data={data} />} */}
        </div>
        <DialogContent>
          <div className="flex flex-col items-start">
            <div className="flex gap-2">
              <div className="flex items-center justify-center gap-1">
                <GitBranch className="h-3 w-3 text-foreground/70" />
                <p className="text-xs text-foreground/70"></p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Calendar className="h-3 w-3 text-primary" />
                <p className="text-[10px] text-primary">
                  {' '}
                  {/* Make date a bit smaller */}
                  {moment(dueDate).format('LL')}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
