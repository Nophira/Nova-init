import { confirm, isCancel, cancel } from '@clack/prompts';

export async function askInitializeGit(): Promise<boolean> {
  const initGit = await confirm({
    message: 'Initialize git repository?',
  });

  if (isCancel(initGit)) {
    cancel('Git initialization cancelled.');
    process.exit(0);
  }

  return Boolean(initGit);
}
