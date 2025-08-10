// src/functions/monorepo.ts
import { select, isCancel, cancel } from '@clack/prompts';
import type { MonorepoTool, PackageManager } from '../../types/types.js';

// Monorepo-Optionen
const monorepoOptions: { value: MonorepoTool; label: string }[] = [
  { value: 'lerna', label: 'Lerna – Tool for managing JavaScript projects' },
  { value: 'nx', label: 'Nx – Smart, fast and extensible build system' },
  { value: 'turborepo', label: 'Turborepo – High-performance build system' },
  { value: 'none', label: 'None (Skip)' },
];

export async function askMonorepoTool(): Promise<MonorepoTool> {
  const choice = await select({
    message: 'Do you want to use a Monorepo?',
    options: monorepoOptions,
  });

  if (isCancel(choice)) {
    cancel('Monorepo selection cancelled.');
    process.exit(0);
  }

  return choice as MonorepoTool;
}

export async function askMonorepoPackageManager(monorepo: MonorepoTool): Promise<PackageManager> {
  const supportedPackageManagers: Record<MonorepoTool, PackageManager[]> = {
    lerna: ['npm', 'pnpm'],         // Bun wird nicht unterstützt
    nx: ['npm', 'pnpm', 'bun'],
    turborepo: ['npm', 'pnpm', 'bun'],
    none: ['npm', 'pnpm', 'bun'],   // Falls kein Monorepo, alles erlaubt
  };

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
