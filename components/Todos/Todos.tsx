'use client';
import React from 'react';
import { useToast } from '../ui/use-toast';
import Task from './Task';
import { checkATodo, unCheckATodo } from '@/lib/actions/todo.actions';

const Todos = ({ items }: { items: any }) => {
  const { toast } = useToast();

  const handleOnChangeTodo = async (task: any) => {
    if (task.isCompleted) {
      await unCheckATodo({ taskId: task._id });
    } else {
      await checkATodo({ taskId: task._id });
      toast({
        title: '✅ Task completed',
        description: "You're a rockstar",
        duration: 3000,
      });
    }
  };

  return items.map((task: any) => (
    <Task
      key={task._id}
      data={task}
      isCompleted={task.isCompleted}
      handleOnChange={() => handleOnChangeTodo(task)}
    />
  ));
};

export default Todos;
