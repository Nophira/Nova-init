#!/usr/bin/env node

import { runSetup } from './commands/setup.js';
import { addCommand } from './commands/add.js';
import consola from 'consola';

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

Package Managers Supported: npm, pnpm, bun


`);
    return;
  }

  const command = args[0];

  try {
    switch (command) {
      case 'setup':
        await runSetup();
        break;
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

Package Managers Supported: npm, pnpm, bun

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
