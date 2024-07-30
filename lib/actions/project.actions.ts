'use server';
import Project from '../db/models/project.model';
import Todo from '../db/models/todo.model';
import { connectToDatabase } from '../mongoose';
import { parseStringify } from '../utils';
import { revalidatePath } from 'next/cache';

export async function createProject(params: any) {
  const { name, userId } = params;
  try {
    await connectToDatabase();
    const project = new Project({
      name,
      userId,
    });
    await project.save();
    revalidatePath('/dashboard/projects');
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

export async function getProjectById(params: any) {
  const { projectId } = params;

  try {
    await connectToDatabase();
    //@ts-ignore
    const project = await Project.findById(projectId).exec();
    return parseStringify(project);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch project');
  }
}

export async function deleteProject(params: any) {
  const { projectId, userId } = params;

  try {
    await connectToDatabase();
    //@ts-ignore
    const project = await Project.findById(projectId).exec();
    if (!project) {
      throw new Error('Project not found');
    }

    if (project.userId.toString() !== userId) {
      throw new Error('Unauthorized: You can only delete your own projects');
    }

    //@ts-ignore
    await Todo.deleteMany({ projectId }).exec();
    //@ts-ignore
    await Project.deleteOne({ _id: projectId }).exec();
    revalidatePath('/dashboard/projects');
    return parseStringify(project);
  } catch (error) {
    console.error('heheheeh', error);
    throw new Error('Failed to delete project and its tasks');
  }
}

export async function updateProject(params: any) {
  const { projectId, userId, name } = params;

  try {
    await connectToDatabase();
    //@ts-ignore
    const project = await Project.findById(projectId).exec();
    if (!project) {
      throw new Error('Project not found');
    }

    if (project.userId.toString() !== userId) {
      throw new Error('Unauthorized: You can only update your own projects');
    }

    await Project.updateOne(
      { _id: projectId },
      { $set: { name: name } },
    ).exec();
    await project.save();
    revalidatePath(`/dashboard/projects${projectId}`);
    return parseStringify(project);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update project');
  }
}
