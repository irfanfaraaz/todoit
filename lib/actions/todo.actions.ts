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
      title,
      description,
      userId,
      projectId,
      labelId,
      dueDate: new Date(dueDate),
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

interface SearchTodosParams {
  userId: string;
  query: string;
}

export async function searchTodos(params: SearchTodosParams) {
  try {
    await connectToDatabase();
    const { userId, query } = params;
    //@ts-ignore
    const todos = await Todo.find({
      userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    })
      .populate('projectId')
      .populate('labelId')
      .exec();

    return todos;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to search todos');
  }
}

export async function getTodosByProjectId(params: any) {
  try {
    await connectToDatabase();
    const { projectId } = params;
    //@ts-ignore
    const todos = await Todo.find({ projectId }).populate('projectId').exec();
    return parseStringify(todos);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch todos');
  }
}
export async function getTodosByLabelId(params: any) {
  try {
    await connectToDatabase();
    const { labelId } = params;
    //@ts-ignore
    const todos = await Todo.find({ labelId }).populate('labelId').exec();
    return parseStringify(todos);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch todos');
  }
}

export async function deleteTodoById(params: any) {
  const { taskId } = params;
  try {
    await connectToDatabase();
    //@ts-ignore
    const todo = await Todo.findByIdAndDelete(taskId);
    if (!todo) {
      throw new Error('Todo not found');
    }
    revalidatePath('/dashboard');
    return parseStringify(todo);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete todo');
  }
}

export async function updateTodoById(params: any) {
  const { taskId, updateData } = params;
  try {
    await connectToDatabase();
    //@ts-ignore
    const todo = await Todo.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });
    if (!todo) {
      throw new Error('Todo not found');
    }
    revalidatePath('/dashboard');
    return parseStringify(todo);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update todo');
  }
}
