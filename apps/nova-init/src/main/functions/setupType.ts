import { select, isCancel, cancel } from '@clack/prompts';
import type { SetupType } from '../../types/index.js';

export async function askSetupType(): Promise<SetupType> {
  const setupType = await select({
    message: 'Choose your setup type:',
    options: [
      { value: 'custom', label: 'Custom Setup - Choose everything yourself' },
      { value: 'predefined', label: 'Predefined Setup - Use ready-made tech stacks' }
    ],
  });

  if (isCancel(setupType)) {
    cancel('Setup type selection cancelled.');
    process.exit(0);
  }

  return setupType as SetupType;
}

export function validateSetupType(setupType: string): SetupType {
  if (setupType !== 'custom' && setupType !== 'predefined') {
    throw new Error('Invalid setup type. Must be "custom" or "predefined"');
  }
  return setupType as SetupType;
}
