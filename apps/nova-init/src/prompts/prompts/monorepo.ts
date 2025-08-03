import { select, cancel, isCancel } from '@clack/prompts';
import type { MonorepoTool } from '../../types/types.js';

const monorepoOptions: { label: string; value: MonorepoTool }[] = [
  { label: 'Lerna', value: 'lerna' },
  { label: 'Nx', value: 'nx' },
  { label: 'Turborepo', value: 'turborepo' },
  { label: 'None ( Skip )', value: 'none' as MonorepoTool },
];

export async function promptMonorepo(): Promise<MonorepoTool> {
  const monorepo = await select({
    message: 'Select a monorepo tool:',
    options: monorepoOptions,
  });

  if (isCancel(monorepo)) {
    cancel('Monorepo selection cancelled.');
    process.exit(0);
  }

  return monorepo;
}
