import consola from 'consola';
import path from 'path';
import { runSetup, executeSetup } from '../main/setup-generator.js';
import type { ProjectStructure, PackageManager, MonorepoTool } from '../types/types.js';

import { buildProjectName } from './setup/projectName.js';
import { buildSetupType } from './setup/setupType.js';
import { buildMonorepo } from './setup/monorepo.js';
import { buildFrontend } from './setup/frontend.js';
import { buildBackend } from './setup/backend.js';
import { buildDatabases } from './setup/database.js';
import { buildHosting } from './setup/hosting.js';
import { buildGit } from './setup/git.js';
import { getDefaultPackageManager } from './setup/packageManager.js';

type ArgMap = Record<string, string | boolean>;

const shortToLong: Record<string, string> = {
  p: 'project-name',
  m: 'monorepo',
  mp: 'monorepo-package-manager',
  f: 'frontend',
  fl: 'frontend-language',
  ff: 'frontend-folder',
  fp: 'frontend-package-manager',
  b: 'backend',
  bl: 'backend-language',
  bf: 'backend-folder',
  bp: 'backend-package-manager',
  ms: 'microservices',
  d: 'databases',
  H: 'hosting', // avoid -h conflict with help
  g: 'git',
  pm: 'package-manager',
  t: 'techstack',
  st: 'setup-type',
  h: 'help',
  help: 'help',
};

function parseArgs(argv: string[]): { positionals: string[]; options: ArgMap } {
  const options: ArgMap = {};
  const positionals: string[] = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--') {
      positionals.push(...argv.slice(i + 1));
      break;
    }

    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) {
        options[key] = next;
        i++;
      } else {
        options[key] = true;
      }
      continue;
    }

    if (arg.startsWith('-') && arg.length > 1) {
      const keyRaw = arg.slice(1);
      const mapped = shortToLong[keyRaw] || keyRaw;
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) {
        options[mapped] = next;
        i++;
      } else {
        options[mapped] = true;
      }
      continue;
    }

    positionals.push(arg);
  }

  return { positionals, options };
}

export async function setupCommand(argv: string[]) {
  const { positionals, options } = parseArgs(argv);

  if (options.help) {
    consola.info('Nutze "nova-init help" für die vollständige Hilfe.');
    return;
  }

  // Fallback auf interaktives Setup, wenn keine Optionen übergeben wurden
  if (Object.keys(options).length === 0 && positionals.length === 0) {
    await runSetup();
    return;
  }

  // Projektname
  const projectName = buildProjectName(options, positionals);

  // Setup-Typ + Techstack
  const { setupType, techStack } = buildSetupType(options);

  // Package Manager Defaults
  const defaultPM = getDefaultPackageManager(options);

  // Monorepo
  const { monorepo, monorepoPM } = buildMonorepo(options, defaultPM);

  // Frontend
  const frontend = buildFrontend(options, defaultPM);

  // Backend (inkl. Microservices)
  const backend = buildBackend(options, defaultPM);

  // Datenbanken
  const databases = buildDatabases(options);

  // Hosting
  const hosting = buildHosting(options);

  // Git
  const initializeGit = buildGit(options);

  const config: ProjectStructure = {
    projectName,
    setupType,
    monorepo,
    packageManagers: {
      monorepo: monorepoPM,
      frontend: frontend?.packageManager ?? defaultPM,
      backend: backend?.packageManager ?? defaultPM,
    },
    frontend,
    backend,
    databases,
    hosting,
    initializeGit,
    techStack,
  };

  consola.start(`Nova Init Setup wird ausgeführt für "${projectName}" ...`);
  await executeSetup(config);
  consola.success('Setup abgeschlossen.');
}


