// 'use client';

// import { AddTaskWrapper } from '../add-tasks/add-task-button';
import { Dot } from 'lucide-react';
import moment from 'moment';
import Todos from '../Todos/Todos';
import { getCurrentUser } from '@/lib/session';
import { getAllUserTodos } from '@/lib/actions/todo.actions';

export default async function Today() {
  const user = await getCurrentUser();
  // console.log(user);
  if (!user) {
    throw new Error('User not found');
  }
  const todos = await getAllUserTodos({ userId: user.id });
  const startOfToday = moment().startOf('day');
  const endOfToday = moment().endOf('day');

  const todayTodos = await todos.filter((todo: any) => {
    const dueDate = moment(todo.dueDate);
    return dueDate.isBetween(startOfToday, endOfToday, null, '[]');
  });

  const overdueTodos = await todos.filter((todo: any) => {
    return moment(todo.dueDate).isBefore(startOfToday);
  });

  if (todos === undefined || todayTodos === undefined) {
    <p>Loading...</p>;
  }
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Today</h1>
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
      {/* <AddTaskWrapper /> */}
      <div className="flex flex-col gap-1 py-4">
        <p className="flex items-center border-b-2 border-gray-100 p-2 text-sm font-bold">
          {moment(new Date()).format('LL')}
          <Dot />
          Today
          <Dot />
          {moment(new Date()).format('dddd')}
        </p>
        <Todos items={todayTodos} />
      </div>
    </div>
  );
}
