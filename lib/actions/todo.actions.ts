'use server';
import Todo from '../db/models/todo.model';
import { connectToDatabase } from '../mongoose';
import { parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';

interface GetAllUserTodosParams {
  userId: string;
}

export async function getAllUserTodos(params: GetAllUserTodosParams) {
  try {
    await connectToDatabase();
    const { userId } = params;
    //@ts-ignore
    const todos = await Todo.find({ userId })
      .populate('projectId')
      .populate('labelId')
      .exec();

    return parseStringify(todos);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch user todos');
  }
}

export async function createTodo(params: any) {
  const { title, description, userId, projectId, labelId, dueDate } = params;
  try {
    await connectToDatabase();
    const todo = new Todo({
      title: 'test 2',
      description: 'heeh',
      userId,
      // projectId,
      // labelId,
      dueDate: new Date(),
    });
    await todo.save();
    revalidatePath('/dashboard');
    return parseStringify(todo);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create todo');
  }
}

export async function checkATodo(params: any) {
  const { taskId } = params;
  try {
    await connectToDatabase();
    // @ts-ignore
    const todo = await Todo.findById(taskId);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.isCompleted = true;
    await todo.save();
    revalidatePath('/dashboard');
    return parseStringify(todo);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to check todo');
  }
}

export async function unCheckATodo(params: any) {
  const { taskId } = params;
  try {
    await connectToDatabase();
    // @ts-ignore
    const todo = await Todo.findById(taskId);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.isCompleted = false;
    await todo.save();
    revalidatePath('/dashboard');
    return parseStringify(todo);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to uncheck todo');
  }
}
