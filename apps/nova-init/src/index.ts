#!/usr/bin/env node

import consola from 'consola';
import { Command } from 'commander';
import { setupPrompt } from './main/setup.prompt.js';
import { setupCommandLine } from './main/setup.commandline.js';
import { TechstackManager } from './core/TechstackManager.js';
import { NovaInitWriter } from './utils/nova-init-writer.js';
import * as path from 'path';

const program = new Command();

program
  .name('create-nova-init')
  .description('A modern CLI tool for scaffolding your next project')
  .version('2.0.0');

// Central help command
program
  .command('help')
  .description('Show detailed help for all commands')
  .option('-c, --command <name>', 'Show help for specific command')
  .action((options) => {
    if (options.command) {
      // Show help for specific command
      const command = program.commands.find(cmd => cmd.name() === options.command);
      if (command) {
        command.help();
      } else {
        console.log(`❌ Command '${options.command}' not found`);
        console.log('Available commands:');
        program.commands.forEach(cmd => {
          if (cmd.name() !== 'help') {
            console.log(`  ${cmd.name()} - ${cmd.description()}`);
          }
        });
      }
    } else {
      // Show general help
      console.log('🚀 Nova-Init CLI - A modern CLI tool for scaffolding your next project\n');
      
      console.log('📋 Available Commands:');
      console.log('  setup       Interactive setup mode');
      console.log('  setup-cli   Command-line setup mode');
      console.log('  config      Manage nova-init.json configuration');
      console.log('  info        Show project information');
      console.log('  help        Show this help message\n');
      
      console.log('💡 Quick Start:');
      console.log('  npx create-nova-init setup                    # Interactive mode');
      console.log('  npx create-nova-init setup-cli -n my-project  # Command-line mode');
      console.log('  npx create-nova-init help --command setup-cli # Detailed command help\n');
      
      console.log('🔧 Configuration Management:');
      console.log('  npx create-nova-init config --show            # Show current config');
      console.log('  npx create-nova-init config --backup          # Create backup');
      console.log('  npx create-nova-init info                     # Show project info\n');
      
      console.log('📚 For more information, visit: https://github.com/Nophira/Nova-init');
    }
  });

program
  .command('setup')
  .description('Interactive setup mode')
  .action(async () => {
    try {
      await setupPrompt();
    } catch (error) {
      consola.error('Setup failed:', error);
      process.exit(1);
    }
  });

program
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

// Configuration management commands
program
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

program
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
      
      // Note: createdAt is added by the NovaInitWriter, not part of ProjectStructure
      console.log(`📅 Configuration file: ${writer.getConfigPath()}`);
    } catch (error) {
      consola.error('Failed to show project info:', error);
      process.exit(1);
    }
  });

program.parse();
