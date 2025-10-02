#!/usr/bin/env node

import consola from 'consola';
import { Command } from 'commander';
import { setupPrompt } from './main/setup.prompt.js';
import { setupCommandLine } from './main/setup.commandline.js';
import { NovaInitWriter } from './core/nova-init-writer.js';
import * as path from 'path';




const program = new Command();

function normalize(val: string) {
  return val.replace(/^=/, ''); 
}
program
  .name('nova-init')
  .description('A modern CLI tool for scaffolding your next project')
  .option('-n, --project-name <name>', 'Project name (required)',normalize)
  .option('-t, --setup-type <type>', 'Setup type: custom or predefined',normalize,'custom')
  .option('-f, --frontend <framework>', 'Frontend framework',normalize, 'react')
  .option('-b, --backend <framework>', 'Backend framework',normalize, 'express')
  .option('-d, --databases <dbs>', 'Comma-separated list of databases',normalize, 'none')
  .option('-m, --monorepo <tool>', 'Monorepo tool: none, lerna, nx, turborepo',normalize, 'none')
  .option('-p, --package-manager <pm>', 'Package manager: npm, pnpm, bun',normalize, 'npm')
  .option('--frontend-package-manager <pm>', 'Frontend package manager',normalize)
  .option('--backend-package-manager <pm>', 'Backend package manager',normalize)
  .option('--monorepo-package-manager <pm>', 'Monorepo package manager',normalize)
  .option('--frontend-folder <folder>', 'Frontend folder name',normalize)
  .option('--backend-folder <folder>', 'Backend folder name',normalize)
  .option('--vite', 'Use Vite for React projects (default: true)')
  .option('--microservices', 'Enable microservices architecture')
  .option('--techstack <stack>', 'Predefined tech stack: MERN, MERN_TS, MEAN, MEVN, MEVN_TS, FULLSTACK_TS',normalize)
  .option('-g, --git', 'Initialize git repository')
  .action(async (options) => {
  try {
 
    if (options.projectName) {
      await setupCommandLine(options);
    } else {

      await setupPrompt();
    }
  } catch (error) {
    consola.error('Setup failed:', error);
    process.exit(1);
  }
});



const configCommand = program
  .command('config')
  .description('Manage project configuration and information')
  .option('-p, --path <path>', 'Project path', '.')
  .option('--show', 'Show current configuration')
  .option('--validate', 'Validate configuration')
  .option('--backup', 'Create backup of configuration')
  .option('--restore <backup-path>', 'Restore configuration from backup')
  .option('--info', 'Show project information')
  .action(async (options) => {
    try {
      const projectPath = path.resolve(options.path);
      const writer = new NovaInitWriter(projectPath);

      // Zeige Projektinfo
      if (options.info) {
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
        return;
      }

      // Zeige Config
      if (options.show) {
        const config = await writer.readConfig();
        if (config) {
          console.log('📋 Current Configuration:');
          console.log(JSON.stringify(config, null, 2));
        } else {
          console.log('❌ No nova-init.json found in this directory');
        }
        return;
      }

      // Validierung
      if (options.validate) {
        const config = await writer.readConfig();
        if (config) {
          console.log('✅ Configuration is valid');
        } else {
          console.log('❌ No valid configuration found');
        }
        return;
      }

      // Backup
      if (options.backup) {
        const backupPath = await writer.backupConfig();
        if (backupPath) {
          console.log(`📦 Backup created: ${backupPath}`);
        } else {
          console.log('❌ No configuration to backup');
        }
        return;
      }

      // Restore
      if (options.restore) {
        await writer.restoreConfig(options.restore);
        console.log('✅ Configuration restored');
        return;
      }

 
      console.log('📋 Project Commands:');
      console.log('  --info       Show project information');
      console.log('  --show       Show current configuration');
      console.log('  --validate   Validate configuration');
      console.log('  --backup     Create backup of configuration');
      console.log('  --restore    Restore configuration from backup');

    } catch (error) {
      consola.error('Project management failed:', error);
      process.exit(1);
    }
  });

  // General flags helper
program
  .helpOption(false) 
  .option('-h, --help', 'Show all available flags for nova-init and config commands')
  .action(() => {
    const opts = program.opts();
    if (opts.help) {
      console.log(`
🚀 **nova-init CLI Flags**

General project setup:
  -n, --project-name <name>          Project name (required)
  -t, --setup-type <type>            Setup type: custom or predefined (default: custom)
  -f, --frontend <framework>         Frontend framework (default: react)
  -b, --backend <framework>          Backend framework (default: express)
  -d, --databases <dbs>              Comma-separated list of databases (default: none)
  -m, --monorepo <tool>              Monorepo tool: none, lerna, nx, turborepo (default: none)
  -p, --package-manager <pm>         Package manager: npm, pnpm, bun (default: npm)
  --frontend-package-manager <pm>    Frontend package manager
  --backend-package-manager <pm>     Backend package manager
  --frontend-folder <folder>         Frontend folder name
  --backend-folder <folder>          Backend folder name
  --vite                             Use Vite for React projects
  --microservices                    Enable microservices architecture
  --techstack <stack>                Predefined tech stack
  -g, --git                          Initialize git repository

Configuration commands:
  nova-init config -p <path> [--info|--show|--validate|--backup|--restore <backup-path>]
      `);
      process.exit(0);
    }
  });



program.parse(process.argv);




