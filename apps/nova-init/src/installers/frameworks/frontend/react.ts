import { execSync } from 'child_process';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';

export async function installReact(
  targetPath: string, 
  projectName: string, 
  language: Language = 'javascript', 
  packageManager: PackageManager = 'npm',
  useVite: boolean = true
) {
  try {
    if (useVite) {
      consola.info(`⚛️ Installing React (${language}) with Vite in "${targetPath}"...`);

      const templateFlag = language === 'typescript' ? '-- --template react-ts' : '-- --template react';
    
      execSync(`npm create vite@latest . ${templateFlag}`, {
        cwd: targetPath,
        stdio: 'inherit',
      });
    } else {
      consola.info(`⚛️ Installing React (${language}) with Create React App in "${targetPath}"...`);

      const templateFlag = language === 'typescript' ? '--template typescript' : '';
    
      execSync(`npx create-react-app . ${templateFlag}`, {
        cwd: targetPath,
        stdio: 'inherit',
      });
    }

    // Install dependencies with specified package manager
    if (packageManager !== 'npm') {
      consola.info(`📦 Installing dependencies with ${packageManager}...`);
      
      // Remove package-lock.json if exists
      execSync('rm -f package-lock.json', { cwd: targetPath, stdio: 'ignore' });
      
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
    
    consola.success(`✅ React (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install React:`, error);
    throw error;
  }
}
