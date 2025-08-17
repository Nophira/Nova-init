// 🆕 NEUE IMPORT-METHODE: Verwende die globalen Types
import type { 
  MonorepoTool, 
  PackageManager,
  ProjectStructure,
  SetupCommandOptions 
} from '../../types/index.js';

// 🔄 LEGACY IMPORT (funktioniert weiterhin):
// import type { MonorepoTool, PackageManager } from '../../types/types.js';

import { normalizePackageManager } from './packageManager.js';

// 🆕 ERWEITERTE TYPE-DEFINITION mit globalen Types
type ArgMap = Record<string, string | boolean>;

// 🆕 UTILITY TYPE mit globalen Types
type MonorepoConfig = Pick<ProjectStructure, 'monorepo' | 'packageManagers'>;

function normMonorepo(m?: string | boolean): MonorepoTool {
  if (!m || typeof m === 'boolean') return 'none';
  const v = m.toLowerCase();
  if (v === 'turborepo' || v === 'turbo') return 'turborepo';
  if (v === 'nx') return 'nx';
  if (v === 'lerna') return 'lerna';
  return 'none';
}

// 🆕 ERWEITERTE FUNKTION mit globalen Types
export function buildMonorepo(
  options: ArgMap,
  defaultPM?: PackageManager
): { monorepo: MonorepoTool; monorepoPM?: PackageManager } {
  const monorepo = normMonorepo(options['monorepo']);
  const monorepoPM = normalizePackageManager(options['monorepo-package-manager'], defaultPM);
  return { monorepo, monorepoPM };
}

// 🆕 NEUE FUNKTION: Erstelle vollständige Monorepo-Konfiguration
export function createMonorepoConfig(
  options: SetupCommandOptions,
  defaultPM: PackageManager = 'npm'
): MonorepoConfig {
  const { monorepo, monorepoPM } = buildMonorepo(options, defaultPM);
  
  return {
    monorepo,
    packageManagers: {
      monorepo: monorepoPM
    }
  };
}

// 🆕 BEISPIEL: Utility Types verwenden
export type OptionalMonorepoConfig = Partial<MonorepoConfig>;
export type RequiredMonorepoConfig = Required<Pick<MonorepoConfig, 'monorepo'>>;


