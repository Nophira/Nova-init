import type { PackageManager } from '../../types/types.js';

type ArgMap = Record<string, string | boolean>;

function normPM(pm?: string | boolean): PackageManager | undefined {
  if (!pm || typeof pm === 'boolean') return undefined;
  const v = pm.toLowerCase();
  if (v === 'npm' || v === 'pnpm' || v === 'yarn' || v === 'bun') return v as PackageManager;
  return undefined;
}

export function getDefaultPackageManager(options: ArgMap): PackageManager | undefined {
  return normPM(options['package-manager']);
}

export function normalizePackageManager(value: string | boolean | undefined, fallback?: PackageManager): PackageManager | undefined {
  return normPM(value) || fallback;
}


