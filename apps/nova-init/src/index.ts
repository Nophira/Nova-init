#!/usr/bin/env node

import { runSetup } from './commands/setup.js';
import { addCommand } from './commands/add.js';
import consola from 'consola';
import type { SetupCommandOptions } from './types/index.js';

function parseSetupArgs(args: string[]): SetupCommandOptions {
  const opts: SetupCommandOptions = {};
  const mapShortToLong: Record<string, string> = {
    p: 'project-name',
    m: 'monorepo',
    mp: 'monorepo-package-manager',
    pm: 'package-manager',
    t: 'techstack',
    st: 'setup-type',
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
    H: 'hosting',
    g: 'git',
    h: 'help',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      switch (key) {
        case 'git':
        case 'help':
          (opts as any)[key] = true;
          break;
        case 'microservices': {
          if (!next || next.startsWith('-')) {
            (opts as any)[key] = true;
          } else {
            (opts as any)[key] = next;
            i++;
          }
          break;
        }
        case 'databases': {
          if (next && !next.startsWith('-')) {
            (opts as any).databases = next.split(',').map(s => s.trim()).filter(Boolean) as any;
            i++;
          }
          break;
        }
        default: {
          if (next && !next.startsWith('-')) {
            (opts as any)[key] = next;
            i++;
          } else {
            (opts as any)[key] = true;
          }
        }
      }
    } else if (arg.startsWith('-')) {
      const keyPart = arg.slice(1);
      const long = mapShortToLong[keyPart];
      const next = args[i + 1];
      if (!long) continue;
      switch (long) {
        case 'git':
        case 'help':
          (opts as any)[long] = true;
          break;
        case 'microservices': {
          if (!next || next.startsWith('-')) {
            (opts as any)[long] = true;
          } else {
            (opts as any)[long] = next;
            i++;
          }
          break;
        }
        case 'databases': {
          if (next && !next.startsWith('-')) {
            (opts as any).databases = next.split(',').map(s => s.trim()).filter(Boolean) as any;
            i++;
          }
          break;
        }
        default: {
          if (next && !next.startsWith('-')) {
            (opts as any)[long] = next;
            i++;
          } else {
            (opts as any)[long] = true;
          }
        }
      }
    }
  }

  if (opts.techstack && !opts['setup-type']) {
    opts['setup-type'] = 'predefined';
  }
  return opts;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    consola.info(`
🚀 Nova-Init - Modern Project Setup Tool

Usage:
  nova-init setup [options]    - Create a new project
  nova-init add <type> [options] - Add components to existing project
  nova-init --help             - Show this help message

Examples:
  nova-init setup
  nova-init add frontend --framework react --lang ts
  nova-init add database --database mongodb

Package Managers Supported: npm, pnpm, yarn, bun


`);
    return;
  }

  const command = args[0];

  try {
    switch (command) {
      case 'setup': {
        const setupArgs = args.slice(1);
        if (setupArgs.includes('--help') || setupArgs.includes('-h')) {
          consola.info(`
⚙️  Setup Usage:
  nova-init setup [options]

Options:
  -p,  --project-name <name>        Project name (default: current directory name)
  -m,  --monorepo <type>            Monorepo type: turborepo, nx, lerna, none
  -mp, --monorepo-package-manager   Package manager for monorepo: npm, pnpm, yarn, bun
  -pm, --package-manager <pm>       Default package manager fallback: npm, pnpm, yarn, bun
  -t,  --techstack <name>           Predefined tech stack: MERN, MEAN, MEVN, MERN_TS, MEAN_TS, MEVN_TS
  -st, --setup-type <type>          Setup type: custom, predefined (auto 'predefined' if --techstack set)
  -f,  --frontend <framework>       Frontend framework (react, nextjs, vue, svelte, angular, nuxtjs, astro, remix, solid, qwik, preact, lit)
  -fl, --frontend-language <lang>   Frontend language: typescript, javascript
  -ff, --frontend-folder <name>     Frontend folder name (default: frontend)
  -fp, --frontend-package-manager   Package manager for frontend
  -b,  --backend <framework>        Backend framework (express, nestjs, fastify)
  -bl, --backend-language <lang>    Backend language: typescript, javascript
  -bf, --backend-folder <name>      Backend folder name (default: backend)
  -bp, --backend-package-manager    Package manager for backend
  -ms, --microservices <names>      Microservice names (comma-separated) or use flag to enable
  -d,  --databases <names>          Databases (comma-separated)
  -H,  --hosting <type>             Hosting type: docker
  -g,  --git                        Initialize git repository
`);
          break;
        }
        const options = parseSetupArgs(args.slice(1));
        await runSetup(options);
        break;
      }
      case 'add':
        await addCommand(args.slice(1));
        break;
      case '--help':
      case '-h':
        consola.info(`
🚀 Nova-Init - Modern Project Setup Tool

Commands:
  setup [options]    - Create a new project with interactive prompts
  add <type> [options] - Add components to existing project

Types for add command:
  frontend    - Add frontend framework (React, Vue, Angular, etc.)
  backend     - Add backend framework (Express, NestJS, Fastify)
  database    - Add database with Docker
  monorepo    - Add monorepo tool (Lerna, Nx, Turborepo)
  techstack   - Add predefined tech stack

Examples:
  nova-init setup
  nova-init add frontend --framework react --lang ts
  nova-init add backend --framework express --lang js
  nova-init add database --database mongodb
  nova-init add monorepo --tool turborepo

Package Managers Supported: npm, pnpm, yarn, bun

For detailed help on any command:
  nova-init setup --help
  nova-init add frontend --help
`);
        break;
      default:
        consola.error(`Unknown command: ${command}`);
        consola.info('Run "nova-init --help" for usage information.');
        process.exit(1);
    }
  } catch (error) {
    consola.error('❌ Command failed:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  consola.error('❌ Unexpected error:', error);
  process.exit(1);
});
