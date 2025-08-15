import type { MonorepoTool, PackageManager } from '../../types/types.js';
import { normalizePackageManager } from './packageManager.js';

type ArgMap = Record<string, string | boolean>;

function normMonorepo(m?: string | boolean): MonorepoTool {
  if (!m || typeof m === 'boolean') return 'none';
  const v = m.toLowerCase();
  if (v === 'turborepo' || v === 'turbo') return 'turborepo';
  if (v === 'nx') return 'nx';
  if (v === 'lerna') return 'lerna';
  return 'none';
}

export function buildMonorepo(
  options: ArgMap,
  defaultPM?: PackageManager
): { monorepo: MonorepoTool; monorepoPM?: PackageManager } {
  const monorepo = normMonorepo(options['monorepo']);
  const monorepoPM = normalizePackageManager(options['monorepo-package-manager'], defaultPM);
  return { monorepo, monorepoPM };
}


