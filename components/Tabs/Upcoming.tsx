// 'use client';

import { Dot } from 'lucide-react';
import moment from 'moment';
import Todos from '../Todos/Todos';
import { getCurrentUser } from '@/lib/session';
import { getAllUserTodos } from '@/lib/actions/todo.actions';
import { AddTaskWrapper } from '../Tasks/AddTaskWrapper';
import { labels, projects } from '@/lib/constants';
// import { AddTaskWrapper } from '../add-tasks/add-task-button';

export default async function Upcoming() {
  const user = await getCurrentUser();
  // console.log(user);
  if (!user) {
    throw new Error('User not found');
  }
  const todos = await getAllUserTodos({ userId: user.id });

  const startOfToday = moment().startOf('day');

  const overdueTodos = await todos.filter((todo: any) => {
    return moment(todo.dueDate).isBefore(startOfToday);
  });

  const groupTodosByDate = todos.reduce((acc: any, todo: any) => {
    const dueDate = moment(todo.dueDate);
    if (dueDate.isBefore(startOfToday)) {
      return acc;
    }
    const formattedDate = dueDate.format('LL');
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(todo);
    return acc;
  }, {});

  return (
    <div className="px-10 md:px-20">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Upcoming</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <p className="flex text-sm font-bold">Overdue</p>
        {overdueTodos.length === 0 ? (
          <p className="text-green-600">Great job! No overdue tasks!</p>
        ) : (
          <>
            <p className="text-red-500">Oops! You are running late.</p>
            <Todos items={overdueTodos} />
          </>
        )}
      </div>
      <div className="pb-6">
        <AddTaskWrapper userId={user.id} projects={projects} labels={labels} />
      </div>
      <div className="flex flex-col gap-1 py-4">
        {Object.keys(groupTodosByDate || {}).map((dueDate) => {
          return (
            <div key={dueDate} className="mb-6">
              <p className="flex items-center text-sm font-bold">
                {moment(dueDate).format('LL')} <Dot />
                {moment(dueDate).format('dddd')}
              </p>
              <ul>
                <Todos items={groupTodosByDate[dueDate]} />
                <AddTaskWrapper
                  userId={user.id}
                  projects={projects}
                  labels={labels}
                />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
