// core/config-normalizer.ts
import type { ProjectStructure, SetupCommandOptions, DatabaseType } from '../types/index.js';

export function normalizeOptionsToProject(options: SetupCommandOptions): ProjectStructure {
  if (!options.projectName) {
    throw new Error('❌ Project name is required. Use --project-name <name>');
  }

  const databases = options.databases
    ? options.databases.split(',').map(db => ({
        type: db.trim() as DatabaseType,
        name: db.trim(),
      }))
    : [];

  return {
    projectName: options.projectName,
    setupType: options.setupType || 'custom',
    monorepo: options.monorepo || 'none',
    packageManagers: {
      monorepo: options.monorepoPackageManager || undefined,
      frontend: options.frontendPackageManager || options.packageManager || 'npm',
      backend: options.backendPackageManager || options.packageManager || 'npm',
    },
    frontend: options.frontend
      ? {
          language: options.frontendLanguage || 'typescript',
          framework: options.frontend as any,
          folderName: options.frontendFolder || 'frontend',
          packageManager: options.frontendPackageManager || options.packageManager || 'npm',
          buildTool: (options.frontend === 'react' && options.vite !== false) ? 'vite' : 'standard',
        }
      : undefined,
    backend: options.backend
      ? {
          language: options.backendLanguage || 'typescript',
          framework: options.backend as any,
          useMicroservices: !!options.microservices,
          microserviceNames: options.microservices
            ? ['user', 'worker', 'payment', 'gateway']
            : undefined,
          folderName: options.backendFolder || 'backend',
          packageManager: options.backendPackageManager || options.packageManager || 'npm',
        }
      : undefined,
    databases,
    initializeGit: !!options.git,
    techStack: options.techstack,
  };
}
