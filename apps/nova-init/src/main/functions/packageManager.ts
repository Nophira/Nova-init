// src/functions/packageManager.ts
import { select, isCancel, cancel } from '@clack/prompts';
import type { MonorepoTool, PackageManager } from '../../types/index.js';

// Monorepo-spezifische unterstützte Package Manager
const supportedPackageManagers: Record<MonorepoTool, PackageManager[]> = {
  lerna: ['npm', 'pnpm'],         // Bun wird nicht unterstützt
  nx: ['npm', 'pnpm', 'bun'],
  turborepo: ['npm', 'pnpm', 'bun'],
  none: ['npm', 'pnpm', 'bun'],   // Falls kein Monorepo, alles erlaubt
};

export async function askMonorepoPackageManager(
  monorepo: MonorepoTool
): Promise<PackageManager> {
  const allowed = supportedPackageManagers[monorepo];

  const pkg = await select({
    message: `Select a package manager for the monorepo (${monorepo}):`,
    options: allowed.map(pm => ({ value: pm, label: pm })),
  });

  if (isCancel(pkg)) {
    cancel('Package manager selection cancelled.');
    process.exit(0);
  }

  return pkg as PackageManager;
}

export async function askPackageManager(message: string): Promise<PackageManager> {
  const pkg = await select({
    message,
    options: [
      { value: 'npm', label: 'npm' },
      { value: 'pnpm', label: 'pnpm' },
      { value: 'bun', label: 'bun' },
    ],
  });

  if (isCancel(pkg)) {
    cancel('Package manager selection cancelled.');
    process.exit(0);
  }

  return pkg as PackageManager;
}
