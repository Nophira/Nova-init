import { select, cancel, isCancel } from '@clack/prompts';
import type { BackendFramework } from '../../types/types.js';

const backendOptions: { label: string; value: BackendFramework }[] = [
  { label: 'Express', value: 'express' },
  { label: 'NestJS', value: 'nestjs' },
  { label: 'Fastify', value: 'fastify' },
  { label: 'None  ( Skip )', value: 'none' as BackendFramework },
];

export async function promptBackend(): Promise<BackendFramework> {
  const backend = await select({
    message: 'Select a backend framework:',
    options: backendOptions,
  });

  if (isCancel(backend)) {
    cancel('Backend selection cancelled.');
    process.exit(0);
  }

  return backend;
}
