import consola from 'consola';
import { promptSetup } from '../main/setup.prompt.js';
import type { SetupCommandOptions } from '../types/index.js';

export async function runSetup(options: SetupCommandOptions = {}): Promise<void> {
  try {
    consola.info('🚀 Starting Nova-Init Setup...');
    
    if (options.help || options.h) {
      showSetupHelp();
      return;
    }

    // Run interactive setup
    const result = await promptSetup();
    
    consola.success('✅ Setup completed successfully!');
    consola.info(`📁 Project created at: ${result.projectName}`);
    
    if (result.initializeGit) {
      consola.info('📝 Git repository initialized');
    }
    
    if (result.databases.length > 0) {
      consola.info(`🗄️  Databases configured: ${result.databases.map(db => db.type).join(', ')}`);
    }
    
    consola.info('\n🎉 Your project is ready! Next steps:');
    consola.info(`  cd ${result.projectName}`);
    consola.info('  npm run dev  # or your preferred start command');
    
  } catch (error) {
    consola.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

function showSetupHelp(): void {
  consola.info(`
🔧 Nova-Init Setup Command Usage:
  nova-init setup [options]

Available Options:
  --help, -h                    - Show this help message
  --project-name <name>         - Set project name
  --setup-type <type>           - Setup type: custom | predefined
  --monorepo <tool>             - Monorepo tool: none | lerna | nx | turborepo
  --frontend <framework>        - Frontend framework
  --backend <framework>         - Backend framework
  --databases <list>            - Comma-separated list of databases
  --hosting <option>            - Hosting option: none | docker
  --git                         - Initialize Git repository
  --package-manager <pm>        - Default package manager

Examples:
  nova-init setup
  nova-init setup --project-name my-app --setup-type predefined
  nova-init setup --frontend react --backend express --databases mongodb,redis
  nova-init setup --help
`);
}
