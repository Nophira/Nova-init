import { execa } from 'execa';
import consola from 'consola';
import type { PackageManager } from '../../types/index.js';

export async function installTurborepo(targetPath: string, packageManager: PackageManager): Promise<void> {
  const pm = packageManager;
  try {
    consola.info(`⚙️ Creating Turborepo at ${targetPath} with ${pm}...`);
    const pmArg = pm; // create-turbo expects -m npm|pnpm|bun
    await execa('npx', ['create-turbo@latest', '-m', pmArg], { cwd: targetPath, stdio: 'inherit' });
    consola.success('✅ Turborepo created successfully.');
  } catch (error) {
    consola.error('❌ Failed to create Turborepo:', error);
    throw error;
  }
}
