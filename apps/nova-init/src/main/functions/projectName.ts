import { text, isCancel, cancel } from '@clack/prompts';
import { mkdir, access } from 'fs/promises';
import path from 'path';

export async function askProjectName(): Promise<string> {
  const name = await text({
    message: 'What is your project name?',
    placeholder: 'my-awesome-project',
  });

  if (isCancel(name)) {
    cancel('Project naming cancelled.');
    process.exit(0);
  }

  const projectName = name?.trim() || 'my-awesome-project';
  
  // Validate project name
  if (!/^[a-z0-9-]+$/.test(projectName)) {
    throw new Error('Project name must contain only lowercase letters, numbers, and hyphens');
  }

  // Create main project directory
  const projectPath = path.resolve(process.cwd(), projectName);
  try {
    await access(projectPath);
    throw new Error(`Directory "${projectName}" already exists. Please choose a different name.`);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // Directory doesn't exist, create it
      await mkdir(projectPath, { recursive: true });
    } else if (error.message.includes('already exists')) {
      throw error;
    }
  }

  return projectName;
}

export async function createProjectDirectory(projectName: string): Promise<string> {
  const projectPath = path.resolve(process.cwd(), projectName);
  await mkdir(projectPath, { recursive: true });
  return projectPath;
}
