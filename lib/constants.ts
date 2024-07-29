import { getUserLabels } from './actions/label.actions';
import { getUserProjects } from './actions/project.actions';
import { getCurrentUser } from './session';

export let projects: any[] = [];
export let labels: any[] = [];

async function initializeUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('User not found');
  }
  projects = await getUserProjects({ userId: user.id });
  labels = await getUserLabels({ userId: user.id });
}

initializeUser();
