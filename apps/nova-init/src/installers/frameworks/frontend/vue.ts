import { execSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';
import path from 'path';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';

export async function installVue(
  targetPath: string, 
  projectName: string, 
  language: Language = 'typescript', 
  packageManager: PackageManager = 'npm'
) {
  try {
    consola.info(`Installing Vue (${language}) in "${targetPath}"...`);

    // Use npx create-vue with proper template selection
    // create-vue expects the template as a positional argument, not as a flag
    const template = language === 'typescript' ? 'vue-ts' : 'vue';
    
    execSync(`npm create-vue@latest . ${template}`, {
      cwd: targetPath,
      stdio: 'inherit'
    });
    
    // Install dependencies with specified package manager
    if (packageManager !== 'npm') {
      consola.info(`Installing dependencies with ${packageManager}...`);
      
      // Remove package-lock.json if exists (cross-platform)
      try {
        const packageLockPath = path.join(targetPath, 'package-lock.json');
        if (existsSync(packageLockPath)) {
          unlinkSync(packageLockPath);
        }
      } catch (error) {
        // Ignore error if file doesn't exist
      }
      
      // Install with specified package manager
      switch (packageManager) {
        case 'pnpm':
          execSync('pnpm install', { cwd: targetPath, stdio: 'inherit' });
          break;
        case 'bun':
          execSync('bun install', { cwd: targetPath, stdio: 'inherit' });
          break;
      }
    }
    
    consola.success(`Vue (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`Failed to install Vue:`, error);
    throw error;
  }
}
