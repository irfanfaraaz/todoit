'use server';

import Label from '../db/models/labels.model';
import { connectToDatabase } from '../mongoose';
import { parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';

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
