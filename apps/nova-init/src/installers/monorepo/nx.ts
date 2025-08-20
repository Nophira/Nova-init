import { execa } from 'execa';
import consola from 'consola';
import type { PackageManager } from '../../types/index.js';

export async function installNx(targetPath: string, packageManager: PackageManager): Promise<void> {
  const pm = packageManager; // create-nx-workspace expects --pm npm|pnpm|bun
  try {
    consola.info(`⚙️ Creating Nx workspace at ${targetPath} with ${pm}...`);
    await execa('npx', ['create-nx-workspace', '--pm', pm], { cwd: targetPath, stdio: 'inherit' });
    consola.success('✅ Nx workspace created successfully.');
  } catch (error) {
    consola.error('❌ Failed to create Nx workspace:', error);
    throw error;
  }
}
