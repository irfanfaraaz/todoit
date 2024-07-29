'use server';
import Project from '../db/models/project.model';
import { connectToDatabase } from '../mongoose';
import { parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';

export async function createProject(params: any) {
  const { name, description, userId, color } = params;
  try {
    await connectToDatabase();
    const project = new Project({
      name,
      description,
      userId,
      color,
    });
    await project.save();
    revalidatePath('/dashboard');
    return parseStringify(project);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create project');
  }
}

export async function getUserProjects(params: any) {
  const { userId } = params;

  try {
    await connectToDatabase();
    //@ts-ignore
    const projects = await Project.find({ userId }).exec();
    return parseStringify(projects);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch projects');
  }
}
