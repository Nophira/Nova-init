import { execSync } from 'child_process';
import consola from 'consola';
import type { PackageManager } from '../../types/index.js';

export async function installNx(projectPath: string, packageManager: PackageManager, projectName: string): Promise<void> {
  try {
    let pm = "npx"; 
    if(packageManager === 'bun') {
      pm = "bunx";
    }else if(packageManager === 'pnpm') {
      pm = "pnpx";
    } else if(packageManager === 'npm') {
      pm = "npx";
    }
    consola.info(`📦 Initializing Nx with ${packageManager} in "${projectPath}"...`);
    consola.info(projectName);
    const cmd = `npx create-nx-workspace --name ${projectName} --pm ${pm}`;
    execSync(cmd, { cwd: projectPath, stdio: 'inherit' });
    consola.success('✅ Nx workspace initialized.');
  } catch (error) {
    consola.error('❌ Failed to initialize Nx:', error);
    throw error;
  }
}
