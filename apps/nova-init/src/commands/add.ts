import consola from 'consola';
import { runTerminalCommand } from '../utils/runTerminalCommand.js';
import { addFrontend } from './addFrontend.ts';
import { addBackend } from './addBackend.ts';
import { addDatabase } from './add/addDatabase.ts';
import { getAvailableDatabases, getDatabaseParameters } from '../installers/database/json-docker-generator.js';
import { readFile, access } from 'fs/promises';
import path from 'path';
import type { AddCommandOptions, ProjectStructure } from '../types/index.js';

interface ParsedArgs {
  [key: string]: string | boolean;
}

function parseArgs(args: string[]): ParsedArgs {
  const parsed: ParsedArgs = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const nextArg = args[i + 1];

      if (nextArg && !nextArg.startsWith('--')) {
        parsed[key] = nextArg;
        i++; // Skip the next argument since we consumed it
      } else {
        parsed[key] = true; // Boolean flag
      }
    }
  }

  return parsed;
}

async function getProjectConfig(): Promise<ProjectStructure | null> {
  try {
    const novaInitPath = path.join(process.cwd(), 'nova-init.json');
    await access(novaInitPath);
    
    const content = await readFile(novaInitPath, 'utf-8');
    return JSON.parse(content) as ProjectStructure;
  } catch (error) {
    return null;
  }
}

async function showDatabaseHelp(database?: string) {
  if (!database) {
    const availableDbs = await getAvailableDatabases();
    consola.info(`
🗄 Database Setup:
  nova-init add database --database <database> [options]

Available databases: ${availableDbs.join(', ')}

Common Parameters:
  --port <number>           - Custom port for the database
  --containerName <string>  - Custom container name
  --networkName <string>    - Custom network name
  --volumeName <string>     - Custom volume name

Database-specific Parameters:
  --database <string>       - Database name (for SQL databases)
  --username <string>       - Username (for SQL databases)
  --password <string>       - Password (for SQL databases)

Examples:
  nova-init add database --database mongodb
  nova-init add database --database postgresql --port 5433 --username myuser --password mypass
  nova-init add database --database redis --port 6380
  nova-init add database --database mysql --database myapp --username admin --password secret123

Use "nova-init add database --database <database> --help" for specific database parameters
`);
    return;
  }

  try {
    const parameters = await getDatabaseParameters(database);
    
    consola.info(`
🗄 ${database.toUpperCase()} Database Setup:
  nova-init add database --database ${database} [options]

Available Parameters:
${Object.entries(parameters).map(([name, config]) => 
  `  --${name} <${config.type}>     - ${config.description} (default: ${config.default})`
).join('\n')}

Examples:
  nova-init add database --database ${database}
  nova-init add database --database ${database} --port 5433 --username myuser --password mypass
`);
  } catch (error) {
    consola.error(`Unknown database: ${database}`);
  }
}

function showAddHelp(type?: string) {
  if (!type) {
    consola.info(`
🔧 Add Command Usage:
  nova-init add <type> [options]

Available types:
  frontend    - Add frontend framework
  backend     - Add backend framework  
  database    - Add database
  monorepo    - Add monorepo tool
  techstack   - Add predefined tech stack

Use "nova-init add <type> --help" for specific help
`);
    return;
  }

  switch (type) {
    case 'frontend':
      consola.info(`
🎨 Frontend Setup:
  nova-init add frontend --framework <framework> --lang <js|ts> [--vite] [--folder <name>]

Available frameworks: react, nextjs, vue, svelte, angular, nuxtjs, astro, remix, solid, qwik, preact, lit

Examples:
  nova-init add frontend --framework react --lang ts --vite
  nova-init add frontend --framework nextjs --lang ts
  nova-init add frontend --framework vue --lang js
`);
      break;
    case 'backend':
      consola.info(`
🛠 Backend Setup:
  nova-init add backend --framework <framework> --lang <js|ts> [--folder <name>]

Available frameworks: express, nestjs, fastify

Examples:
  nova-init add backend --framework express --lang ts
  nova-init add backend --framework nestjs --lang js
`);
      break;
    case 'database':
      showDatabaseHelp();
      break;
    case 'monorepo':
      consola.info(`
📦 Monorepo Setup:
  nova-init add monorepo --tool <tool> [--folder <name>]

Available tools: lerna, nx, turborepo

Examples:
  nova-init add monorepo --tool turborepo
  nova-init add monorepo --tool nx
`);
      break;
    case 'techstack':
      consola.info(`
🚀 Tech Stack Setup:
  nova-init add techstack --techstack <stack> [--folder <name>]

Available stacks: MERN, MEAN, MEVN, MERN_TS, MEAN_TS, MEVN_TS

Examples:
  nova-init add techstack --techstack MERN_TS
  nova-init add techstack --techstack MEAN
`);
      break;
    default:
      consola.error(`Unknown type: ${type}`);
  }
}

export async function addCommand(args: string[]) {
  if (args.length === 0) {
    showAddHelp();
    return;
  }

  const type = args[0];

  // Check if first argument is --help or -h
  if (type === '--help' || type === '-h') {
    showAddHelp();
    return;
  }

  const options = parseArgs(args.slice(1));

  // Show help for specific type
  if (options.help || options.h) {
    showAddHelp(type);
    return;
  }

  // Check if we're in a nova-init project
  const projectConfig = await getProjectConfig();
  if (!projectConfig) {
    consola.error('❌ Not in a nova-init project. Please run "nova-init setup" first.');
    process.exit(1);
  }

  consola.info(`📁 Adding to project: ${projectConfig.projectName}`);

  try {
    switch (type) {
      case 'monorepo':
        if (!options.tool) {
          consola.error('--tool is required when adding a monorepo');
          process.exit(1);
        }
        // await addMonorepo(options);
        consola.warn("addMonorepo is not implemented yet.");
        break;
      case 'techstack':
        if (!options.techstack) {
          consola.error('--techstack is required when adding a techstack');
          process.exit(1);
        }
        // await addTechstack(options);
        consola.warn("addTechstack is not implemented yet.");
        break;
      case 'frontend':
         if (!options.framework) {
          consola.error('--framework is required when adding a frontend');
          process.exit(1);
        }
        await addFrontend(options);
        break;
      case 'backend':
        if (!options.framework) {
          consola.error('--framework is required when adding a backend');
          process.exit(1);
        }

        if (options.microservices && !options.framework) {
          consola.error('--framework is required when using microservices');
          process.exit(1);
        }
        await addBackend(options);
        break;
      case 'database':
        if (options.help || options.h) {
          await showDatabaseHelp(options.database);
          return;
        }
        if (!options.database) {
          consola.error('--database is required when adding a database');
          process.exit(1);
        }
        try {
          await runTerminalCommand({ command: 'docker -v', is_background: false });
        } catch (error) {
          consola.error('Docker is not installed. Please install Docker to add a database.');
          process.exit(1);
        }
        await addDatabase(options);
        break;
      default:
        consola.error(`Unknown type: ${type}`);
        showAddHelp();
        process.exit(1);
    }
  } catch (error) {
    consola.error(`Error adding ${type}:`, error);
    process.exit(1);
  }
}