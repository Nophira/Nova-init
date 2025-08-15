import type { PackageManager } from '../../types/types.js';
import type { FrontendSetup } from '../../types/types.js';
import { normalizePackageManager } from './packageManager.js';

type ArgMap = Record<string, string | boolean>;

function normLang(l?: string | boolean): 'javascript' | 'typescript' {
  if (!l || typeof l === 'boolean') return 'typescript';
  const v = l.toLowerCase();
  return v.startsWith('ts') ? 'typescript' : 'javascript';
}

export function buildFrontend(options: ArgMap, defaultPM?: PackageManager): FrontendSetup | undefined {
  const framework = (options['frontend'] as string) || undefined;
  if (!framework) return undefined;

  return {
    framework: framework.toLowerCase(),
    language: normLang(options['frontend-language']),
    folderName: (options['frontend-folder'] as string) || 'frontend',
    packageManager: (normalizePackageManager(options['frontend-package-manager'], defaultPM) || 'pnpm') as PackageManager,
  };
}


