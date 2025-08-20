import { execSync } from 'child_process';
import consola from 'consola';
import type { PackageManager } from '../../types/index.js';

export async function installNx(projectPath: string, packageManager: PackageManager): Promise<void> {
  try {
    consola.info(`📦 Initializing Nx with ${packageManager} in "${projectPath}"...`);
    const cmd = `npx create-nx-workspace --pm ${packageManager}`;
    execSync(cmd, { cwd: projectPath, stdio: 'inherit' });
    consola.success('✅ Nx workspace initialized.');
  } catch (error) {
    consola.error('❌ Failed to initialize Nx:', error);
    throw error;
  }
}
