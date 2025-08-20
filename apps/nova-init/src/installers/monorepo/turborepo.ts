import { execSync } from 'child_process';
import consola from 'consola';
import type { PackageManager } from '../../types/index.js';

export async function installTurborepo(projectPath: string, packageManager: PackageManager): Promise<void> {
  try {
    consola.info(`📦 Initializing Turborepo with ${packageManager} in "${projectPath}"...`);
    const cmd = `npx create-turbo@latest -m ${packageManager}`;
    execSync(cmd, { cwd: projectPath, stdio: 'inherit' });
    consola.success('✅ Turborepo initialized.');
  } catch (error) {
    consola.error('❌ Failed to initialize Turborepo:', error);
    throw error;
  }
}
