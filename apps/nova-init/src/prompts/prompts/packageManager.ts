// src/prompts/prompts/monorepoPackageManager.ts
import { select, cancel, isCancel } from '@clack/prompts';
import type { PackageManager, MonorepoTool } from '../../types/types.js';

const supported: Record<MonorepoTool, PackageManager[]> = {
  lerna: ['npm', 'pnpm'],        // 🎯 bun ausgeschlossen
  nx: ['npm', 'pnpm', 'bun'],
  turborepo: ['npm', 'pnpm', 'bun'],
  none: ['npm', 'pnpm', 'bun'],
};

export async function promptMonorepoPackageManager(monorepo: MonorepoTool): Promise<PackageManager> {
  const allowed = supported[monorepo];

  const res = await select({
    message: `Select a package manager for ${monorepo}:`,
    options: allowed.map(pm => ({ label: pm, value: pm })),
  });

  if (isCancel(res)) {
    cancel('Package manager selection cancelled.');
    process.exit(0);
  }
  return res as PackageManager;
}
