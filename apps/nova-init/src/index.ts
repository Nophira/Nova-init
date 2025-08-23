#!/usr/bin/env node

import consola from 'consola';
import { Command } from 'commander';
import { setupPrompt } from './main/setup.prompt.js';
import { setupCommandLine } from './main/setup.commandline.js';
import { TechstackManager } from './core/TechstackManager.js';

const program = new Command();

program
  .name('create-nova-init')
  .description('A modern CLI tool for scaffolding your next project')
  .version('2.0.0');

program
  .command('setup')
  .description('Interactive setup mode')
  .action(async () => {
    try {
      await setupPrompt();
    } catch (error) {
      consola.error('❌ Interactive setup failed:', error);
      process.exit(1);
    }
  });

program
  .command('setup-cli')
  .description('Setup with command line parameters')
  .option('-n, --project-name <name>', 'Project name')
  .option('-t, --setup-type <type>', 'Setup type: custom or predefined')
  .option('-m, --monorepo <tool>', 'Monorepo tool: none, lerna, nx, turborepo')
  .option('-f, --frontend <framework>', 'Frontend framework')
  .option('-b, --backend <framework>', 'Backend framework')
  .option('-d, --databases <dbs>', 'Comma-separated list of databases')
  .option('-p, --package-manager <pm>', 'Global package manager: npm, pnpm, bun')
  .option('--frontend-package-manager <pm>', 'Frontend package manager: npm, pnpm, bun')
  .option('--backend-package-manager <pm>', 'Backend package manager: npm, pnpm, bun')
  .option('--monorepo-package-manager <pm>', 'Monorepo package manager: npm, pnpm, bun')
  .option('-g, --git', 'Initialize git repository')
  .option('--techstack <stack>', 'Predefined tech stack: MERN, MEAN, JAM, FULLSTACK_TS')
  .option('--microservices', 'Enable microservices architecture')
  .option('--frontend-folder <folder>', 'Frontend folder name')
  .option('--backend-folder <folder>', 'Backend folder name')
  .action(async (options) => {
    try {
      await setupCommandLine(options);
    } catch (error) {
      consola.error('❌ Command line setup failed:', error);
      process.exit(1);
    }
  });

// Wenn keine Argumente übergeben werden, starte den interaktiven Modus
if (process.argv.length === 2) {
  setupPrompt().catch((error) => {
    consola.error('❌ Interactive setup failed:', error);
    process.exit(1);
  });
} else {
  program.parse();
}
