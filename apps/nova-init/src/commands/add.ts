import consola from 'consola';
import { addFrontend } from '../installers/addFrontend.js';
import { addBackend } from '../installers/addBackend.js';
import { addDatabase } from '../installers/addDatabase.js';
import { addMonorepo } from '../installers/addMonorepo.js';
import { addTechstack } from '../installers/addTechstack.js';

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
      consola.info(`
🗄 Database Setup:
  nova-init add database --database <database> [--folder <name>]

Available databases: mongodb, postgresql, mysql, mariadb, redis, cassandra, cockroachdb, couchdb, edgedb, neo4j, surrealdb, yugabytedb

Examples:
  nova-init add database --database mongodb
  nova-init add database --database postgresql
`);
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

  try {
    switch (type) {
      case 'frontend':
        await addFrontend(options);
        break;
      case 'backend':
        await addBackend(options);
        break;
      case 'database':
        await addDatabase(options);
        break;
      case 'monorepo':
        await addMonorepo(options);
        break;
      case 'techstack':
        await addTechstack(options);
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