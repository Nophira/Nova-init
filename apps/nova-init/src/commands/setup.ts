import consola from 'consola';
import { promptSetup } from '../main/setup.prompt.js';
import type { SetupCommandOptions } from '../types/index.js';

export async function runSetup(options: SetupCommandOptions = {}): Promise<void> {
  try {
    consola.info('🚀 Starting Nova-Init Setup...');
    
    // Run interactive setup
    const result = await promptSetup(options);
    
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
