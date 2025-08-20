// src/functions/monorepo.ts
import { select, isCancel, cancel } from '@clack/prompts';
import type { MonorepoTool, PackageManager } from '../../types/index.js';

export async function askMonorepo(): Promise<MonorepoTool> {
  const monorepo = await select({
    message: 'Do you want to use a Monorepo?',
    options: [
      { value: 'none', label: 'No Monorepo' },
      { value: 'lerna', label: 'Lerna - Classic JavaScript monorepo tool' },
      { value: 'nx', label: 'Nx - Powerful monorepo build system' },
      { value: 'turborepo', label: 'Turborepo - High-performance build system' }
    ],
  });

  if (isCancel(monorepo)) {
    cancel('Monorepo selection cancelled.');
    process.exit(0);
  }

  return monorepo as MonorepoTool;
}

export async function askMonorepoPackageManager(monorepo: MonorepoTool): Promise<PackageManager> {
  // Different monorepo tools support different package managers
  let options: { value: PackageManager; label: string }[] = [];
  
  switch (monorepo) {
    case 'lerna':
      options = [
        { value: 'npm', label: 'npm - Node Package Manager' },
        { value: 'pnpm', label: 'pnpm - Fast, disk space efficient package manager' }
      ];
      break;
    case 'nx':
      options = [
        { value: 'npm', label: 'npm - Node Package Manager' },
        { value: 'pnpm', label: 'pnpm - Fast, disk space efficient package manager' }
      ];
      break;
    case 'turborepo':
      options = [
        { value: 'npm', label: 'npm - Node Package Manager' },
        { value: 'pnpm', label: 'pnpm - Fast, disk space efficient package manager' },
        { value: 'bun', label: 'Bun - All-in-one JavaScript runtime & package manager' }
      ];
      break;
    default:
      throw new Error('Invalid monorepo tool');
  }

  const packageManager = await select({
    message: `Choose package manager for ${monorepo}:`,
    options,
  });

  if (isCancel(packageManager)) {
    cancel('Package manager selection cancelled.');
    process.exit(0);
  }

  return packageManager as PackageManager;
}

export function validateMonorepo(monorepo: string): MonorepoTool {
  if (!['none', 'lerna', 'nx', 'turborepo'].includes(monorepo)) {
    throw new Error('Invalid monorepo tool. Must be "none", "lerna", "nx", or "turborepo"');
  }
  return monorepo as MonorepoTool;
}

export function validateMonorepoPackageManager(monorepo: MonorepoTool, packageManager: string): PackageManager {
  const validPackageManagers: Record<MonorepoTool, PackageManager[]> = {
    none: [],
    lerna: ['npm', 'pnpm'],
    nx: ['npm', 'pnpm'],
    turborepo: ['npm', 'pnpm', 'bun']
  };

  if (!validPackageManagers[monorepo].includes(packageManager as PackageManager)) {
    throw new Error(`Package manager "${packageManager}" is not supported by ${monorepo}`);
  }

  return packageManager as PackageManager;
}

export async function installSelectedMonorepo(projectPath: string, tool: MonorepoTool, packageManager: PackageManager): Promise<void> {
  switch (tool) {
    case 'turborepo': {
      const { installTurborepo } = await import('../../installers/monorepo/turborepo.js');
      await installTurborepo(projectPath, packageManager);
      break;
    }
    case 'nx': {
      const { installNx } = await import('../../installers/monorepo/nx.js');
      await installNx(projectPath, packageManager);
      break;
    }
    case 'lerna': {
      const { installLerna } = await import('../../installers/monorepo/lerna.js');
      await installLerna(projectPath, packageManager);
      break;
    }
    default:
      return;
  }
}
