import { select, isCancel, cancel } from '@clack/prompts';

export async function askSetupType(): Promise<'custom' | 'predefined'> {
  const type = await select({
    message: 'Choose setup type:',
    options: [
      { value: 'custom', label: 'Custom Setup – Choose everything yourself' },
      { value: 'predefined', label: 'Predefined Setup – Use ready-made tech stacks' },
    ],
  });

  if (isCancel(type)) {
    cancel('Setup type selection cancelled.');
    process.exit(0);
  }

  return type as 'custom' | 'predefined';
}
