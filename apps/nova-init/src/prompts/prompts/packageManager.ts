import { select, cancel, isCancel } from '@clack/prompts';
import type { PackageManager } from '../../types/types.js';

const packageManagerOptions = [
  { label: 'npm', value: 'npm' },
  { label: 'bun', value: 'bun' },
  { label: 'pnpm', value: 'pnpm' },
];

export async function promptPackageManager(message = 'Select your package manager:'): Promise<PackageManager> {
  const pm = await select({
    message,
    options: packageManagerOptions,
  });

  if (isCancel(pm)) {
    cancel('Package manager selection cancelled.');
    process.exit(0);
  }

  return pm as PackageManager;
}
