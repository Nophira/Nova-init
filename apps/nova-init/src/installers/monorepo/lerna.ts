import { execSync } from 'child_process';
import consola from 'consola';
import type { PackageManager } from '../../types/index.js';

export async function installLerna(projectPath: string, packageManager: PackageManager): Promise<void> {
  try {
    consola.info(`📦 Initializing Lerna with ${packageManager} in "${projectPath}"...`);
    const cmd = packageManager === 'pnpm' ? 'pnpm dlx lerna init' : 'npx lerna init';
    execSync(cmd, { cwd: projectPath, stdio: 'inherit' });
    consola.success('✅ Lerna initialized.');
  } catch (error) {
    consola.error('❌ Failed to initialize Lerna:', error);
    throw error;
  }
}
