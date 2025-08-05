// src/prompts/prompts/monorepoTool.ts
import { select, cancel, isCancel } from '@clack/prompts';
import type { MonorepoTool } from '../../types/types.js';

const options: { label: string; value: MonorepoTool }[] = [
  { label: 'Lerna',      value: 'lerna' },
  { label: 'Nx',         value: 'nx' },
  { label: 'Turborepo',  value: 'turborepo' },
  { label: 'None (Skip)', value: 'none' },
];

export async function promptMonorepoTool(): Promise<MonorepoTool> {
  const res = await select({
    message: 'Select a monorepo tool:',
    options,
  });

  if (isCancel(res)) {
    cancel('Monorepo selection cancelled.');
    process.exit(0);
  }

  return res as MonorepoTool;
}
