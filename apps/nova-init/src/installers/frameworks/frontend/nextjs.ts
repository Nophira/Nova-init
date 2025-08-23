import { execSync } from 'child_process';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';

export async function installNextJS(
  targetPath: string, 
  projectName: string, 
  language: Language = 'typescript', 
  packageManager: PackageManager = 'npm'
) {
  try {
    consola.info(`⚛️ Installing Next.js (${language}) in "${targetPath}"...`);

    const templateFlag = language === 'typescript' ? '--typescript' : '';

    execSync(`npx create-next-app@latest . ${templateFlag}`, {
      cwd: targetPath,
      stdio: 'inherit',
    });
    
    // Install dependencies with specified package manager
    if (packageManager !== 'npm') {
      consola.info(`📦 Installing dependencies with ${packageManager}...`);
      
      // Remove package-lock.json if exists
      try {
        execSync('rm -f package-lock.json', { cwd: targetPath, stdio: 'ignore', shell: '/bin/bash' });
      } catch (error) {
        // Ignore error if file doesn't exist
      }
      
      // Install with specified package manager
      switch (packageManager) {
        case 'pnpm':
          execSync('pnpm install', { cwd: targetPath, stdio: 'inherit', shell: '/bin/bash' });
          break;
        case 'bun':
          execSync('bun install', { cwd: targetPath, stdio: 'inherit', shell: '/bin/bash' });
          break;
      }
    }
    
    consola.success(`✅ Next.js (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Next.js:`, error);
    throw error;
  }
}
