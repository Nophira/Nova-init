import { text, isCancel, cancel } from '@clack/prompts';

export async function askProjectName(): Promise<string> {
  const name = await text({
    message: 'What is your project name?',
    placeholder: 'my-awesome-project',
  });

  if (isCancel(name)) {
    cancel('Project naming cancelled.');
    process.exit(0);
  }

  return name?.trim() || 'my-awesome-project';
}
