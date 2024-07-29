'use client';
import { Plus } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import AddTaskInline from './AddTaskInline';

export const AddTaskWrapper = ({
  projects,
  userId,
  labels,
  parentTask,
  projectId,
}: {
  userId: string;
  projects: any[];
  labels: any[];
  parentTask?: any;
  projectId?: any;
}) => {
  const [showAddTask, setShowAddTask] = useState(false);

  return showAddTask ? (
    <AddTaskInline
      userId={userId}
      projects={projects}
      labels={labels}
      setShowAddTask={setShowAddTask}
      parentTask={parentTask}
      projectId={projectId}
    />
  ) : (
    <AddTaskButton
      onClick={() => setShowAddTask(true)}
      title={parentTask?._id ? 'Add sub-task' : 'Add task'}
    />
  );
};

export default function AddTaskButton({
  onClick,
  title,
}: {
  onClick: Dispatch<SetStateAction<any>>;
  title: string;
}) {
  return (
    <button className="mt-2 flex flex-1 pl-2" onClick={onClick}>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <div className="flex items-center justify-center gap-2">
          <Plus className="h-4 w-4 text-primary hover:rounded-xl hover:bg-primary hover:text-white" />
          <h3 className="text-base font-light tracking-tight text-foreground/70">
            {title}
          </h3>
        </div>
      </div>
    </button>
  );
}
