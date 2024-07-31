'use server';

import { _id } from '@next-auth/mongodb-adapter';
import Label from '../db/models/labels.model';
import { connectToDatabase } from '../mongoose';
import { parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';
import Todo from '../db/models/todo.model';

export async function createLabel(params: any) {
  const { name, userId } = params;
  try {
    await connectToDatabase();
    const label = new Label({
      name,
      userId,
    });
    await label.save();
    revalidatePath('/dashboard');
    return parseStringify(label);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create label');
  }
}

export async function getUserLabels(params: any) {
  const { userId } = params;
  try {
    await connectToDatabase();
    //@ts-ignore
    const labels = await Label.find({ userId }).exec();
    return parseStringify(labels);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Labels');
  }
}
export async function getLabelById(params: any) {
  const { labelId } = params;

  try {
    await connectToDatabase();
    //@ts-ignore
    const label = await Label.findById(labelId).exec();
    return parseStringify(label);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch label');
  }
}

export async function deleteLabel(params: any) {
  const { labelId, userId } = params;

  try {
    await connectToDatabase();
    //@ts-ignore
    const label = await Label.findById(labelId).exec();
    if (!label) {
      throw new Error('Label not found');
    }

    if (label.userId.toString() !== userId) {
      throw new Error('Unauthorized: You can only delete your own labels');
    }

    //@ts-ignore
    await Todo.deleteMany({ labelId }).exec();
    //@ts-ignore
    await Label.deleteOne({ _id: labelId }).exec();
    revalidatePath('/dashboard/labels');
    return parseStringify(label);
  } catch (error) {
    console.error('heheheeh', error);
    throw new Error('Failed to delete label and its tasks');
  }
}

export async function updateLabel(params: any) {
  const { labelId, userId, name } = params;

  try {
    await connectToDatabase();
    //@ts-ignore
    const label = await Label.findById(labelId).exec();
    if (!label) {
      throw new Error('Label not found');
    }

    if (label.userId.toString() !== userId) {
      throw new Error('Unauthorized: You can only update your own labels');
    }

    await Label.updateOne({ _id: labelId }, { $set: { name: name } }).exec();
    await label.save();
    revalidatePath(`/dashboard/labels${labelId}`);
    return parseStringify(label);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update label');
  }
}
