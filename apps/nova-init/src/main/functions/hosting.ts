import { select, isCancel, cancel } from '@clack/prompts';

export async function askHosting(): Promise<'docker' | 'none'> {
  const hosting = await select({
    message: 'Choose hosting option:',
    options: [
      { value: 'docker', label: 'Docker – Create docker-compose files for hosting' },
      { value: 'none', label: 'None – Skip hosting setup' },
    ],
  });

  if (isCancel(hosting)) {
    cancel('Hosting selection cancelled.');
    process.exit(0);
  }

  return hosting as 'docker' | 'none';
}
