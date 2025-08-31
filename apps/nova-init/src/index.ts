#!/usr/bin/env node

import consola from 'consola';
import { Command } from 'commander';
import { setupPrompt } from './main/setup.prompt.js';
import { setupCommandLine } from './main/setup.commandline.js';
import { TechstackManager } from './core/TechstackManager.js';
import { NovaInitWriter } from './core/nova-init-writer.js';
import * as path from 'path';
import { createHelpCommand } from './main/help.js';

const program = new Command();

program
  .name('create-nova-init')
  .description('A modern CLI tool for scaffolding your next project')
  .version('2.0.0');


program.addCommand(createHelpCommand());


function addHelpOption(command: Command) {
  command.addHelpText('after', `
  Examples:
    create-nova-init ${command.name()} --help
`);
}

const setupCliCommand = program
  .command('setup-cli')
  .description('Command-line setup mode')
  .option('-n, --project-name <name>', 'Project name (required)')
  .option('-t, --setup-type <type>', 'Setup type: custom or predefined', 'custom')
  .option('-f, --frontend <framework>', 'Frontend framework')
  .option('-b, --backend <framework>', 'Backend framework')
  .option('-d, --databases <dbs>', 'Comma-separated list of databases')
  .option('-m, --monorepo <tool>', 'Monorepo tool: none, lerna, nx, turborepo', 'none')
  .option('-p, --package-manager <pm>', 'Package manager: npm, pnpm, bun', 'npm')
  .option('--frontend-package-manager <pm>', 'Frontend package manager')
  .option('--backend-package-manager <pm>', 'Backend package manager')
  .option('--monorepo-package-manager <pm>', 'Monorepo package manager')
  .option('--frontend-folder <folder>', 'Frontend folder name')
  .option('--backend-folder <folder>', 'Backend folder name')
  .option('--vite', 'Use Vite for React projects (default: true)')
  .option('--microservices', 'Enable microservices architecture')
  .option('--techstack <stack>', 'Predefined tech stack: MERN, MERN_TS, MEAN, MEAN_TS, MEVN, MEVN_TS, FULLSTACK_TS')
  .option('-g, --git', 'Initialize git repository')
  .action(async (options) => {
    try {
      await setupCommandLine(options);
    } catch (error) {
      consola.error('Setup failed:', error);
      process.exit(1);
    }
  });

addHelpOption(setupCliCommand);


const configCommand = program
  .command('config')
  .description('Manage nova-init.json configuration')
  .option('-p, --path <path>', 'Project path', '.')
  .option('--show', 'Show current configuration')
  .option('--validate', 'Validate configuration')
  .option('--backup', 'Create backup of configuration')
  .option('--restore <backup-path>', 'Restore configuration from backup')
  .action(async (options) => {
    try {
      const projectPath = path.resolve(options.path);
      const writer = new NovaInitWriter(projectPath);

      if (options.show) {
        const config = await writer.readConfig();
        if (config) {
          console.log('📋 Current Configuration:');
          console.log(JSON.stringify(config, null, 2));
        } else {
          console.log('❌ No nova-init.json found in this directory');
        }
      } else if (options.validate) {
        const config = await writer.readConfig();
        if (config) {
          console.log('✅ Configuration is valid');
        } else {
          console.log('❌ No valid configuration found');
        }
      } else if (options.backup) {
        const backupPath = await writer.backupConfig();
        if (backupPath) {
          console.log(`📦 Backup created: ${backupPath}`);
        } else {
          console.log('❌ No configuration to backup');
        }
      } else if (options.restore) {
        await writer.restoreConfig(options.restore);
        console.log('✅ Configuration restored');
      } else {
        console.log('📋 Configuration Management Commands:');
        console.log('  --show     Show current configuration');
        console.log('  --validate Validate configuration');
        console.log('  --backup   Create backup of configuration');
        console.log('  --restore  Restore configuration from backup');
      }
    } catch (error) {
      consola.error('Configuration management failed:', error);
      process.exit(1);
    }
  });

addHelpOption(configCommand);

const infoCommand = program
  .command('info')
  .description('Show project information')
  .option('-p, --path <path>', 'Project path', '.')
  .action(async (options) => {
    try {
      const projectPath = path.resolve(options.path);
      const writer = new NovaInitWriter(projectPath);

      const config = await writer.readConfig();
      if (!config) {
        console.log('❌ No nova-init.json found in this directory');
        return;
      }

      console.log('🚀 Project Information:');
      console.log(`📁 Project: ${config.projectName}`);
      console.log(`🔧 Setup Type: ${config.setupType}`);
      console.log(`🏗️  Monorepo: ${config.monorepo}`);
      console.log(`📦 Package Managers:`, config.packageManagers);

      if (config.frontend) {
        console.log(`🎨 Frontend: ${config.frontend.framework} (${config.frontend.language})`);
      }

      if (config.backend) {
        console.log(`⚙️  Backend: ${config.backend.framework} (${config.backend.language})`);
        if (config.backend.useMicroservices) {
          console.log(`🔗 Microservices: ${config.backend.microserviceNames?.join(', ')}`);
        }
      }

      if (config.databases.length > 0) {
        console.log(`🗄️  Databases: ${config.databases.map(db => db.type).join(', ')}`);
      }

      if (config.techStack) {
        console.log(`🎯 Tech Stack: ${config.techStack}`);
      }

   
      console.log(`📅 Configuration file: ${writer.getConfigPath()}`);
    } catch (error) {
      consola.error('Failed to show project info:', error);
      process.exit(1);
    }
  });

addHelpOption(infoCommand);


if (process.argv.length === 2) {
 
  setupPrompt().catch((error) => {
    consola.error('Interactive setup failed:', error);
    process.exit(1);
  });
} else {
 
  program.parse();
}