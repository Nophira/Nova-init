import type { PackageManager } from '../../types/types.js';
import type { BackendSetup } from '../../types/types.js';
import { normalizePackageManager } from './packageManager.js';
import { buildMicroservices } from './microservice.js';

type ArgMap = Record<string, string | boolean>;

function normLang(l?: string | boolean): 'javascript' | 'typescript' {
  if (!l || typeof l === 'boolean') return 'typescript';
  const v = l.toLowerCase();
  return v.startsWith('ts') ? 'typescript' : 'javascript';
}

export function buildBackend(options: ArgMap, defaultPM?: PackageManager): BackendSetup | undefined {
  const framework = (options['backend'] as string) || undefined;
  if (!framework) return undefined;

  const ms = buildMicroservices(options);
  return {
    framework: framework.toLowerCase(),
    language: normLang(options['backend-language']),
    folderName: ms.useMicroservices ? undefined : ((options['backend-folder'] as string) || 'backend'),
    useMicroservices: ms.useMicroservices,
    microserviceNames: ms.microserviceNames,
    packageManager: (normalizePackageManager(options['backend-package-manager'], defaultPM) || 'pnpm') as PackageManager,
  };
}


