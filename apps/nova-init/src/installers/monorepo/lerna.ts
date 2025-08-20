import { execa } from 'execa';
import consola from 'consola';
import type { PackageManager } from '../../types/index.js';

export async function installLerna(targetPath: string, packageManager: PackageManager): Promise<void> {
  try {
    consola.info(`⚙️ Initializing Lerna in ${targetPath} with ${packageManager}...`);
    if (packageManager === 'pnpm') {
      await execa('pnpm', ['dlx', 'lerna', 'init'], { cwd: targetPath, stdio: 'inherit' });
    } else if (packageManager === 'npm') {
      await execa('npx', ['lerna', 'init'], { cwd: targetPath, stdio: 'inherit' });
    } 
    consola.success('✅ Lerna initialized successfully.');
  } catch (error) {
    consola.error('❌ Failed to initialize Lerna:', error);
    throw error;
  }
}
