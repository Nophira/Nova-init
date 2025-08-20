import { execSync } from 'child_process';
import { rmSync, mkdirSync } from 'fs';
import path from 'path';
import consola from 'consola';
import type { PackageManager } from '../../types/index.js';

export async function installTurborepo(projectPath: string, packageManager: PackageManager): Promise<void> {
  try {
    consola.info(`📦 Initializing Turborepo with ${packageManager} in "${projectPath}"...`);
    
    // Create Turborepo in current directory
    const cmd = `npx create-turbo@latest . -m ${packageManager}`;
    execSync(cmd, { cwd: projectPath, stdio: 'inherit' });
    
    consola.info('🧹 Cleaning up default Turborepo apps...');
    
    // Remove default apps and packages
    const defaultApps = ['apps/docs', 'apps/web'];
    const defaultPackages = ['packages/eslint-config', 'packages/typescript-config', 'packages/ui'];
    
    // Remove default apps
    defaultApps.forEach(appPath => {
      const fullPath = path.join(projectPath, appPath);
      try {
        rmSync(fullPath, { recursive: true, force: true });
        consola.info(`🗑️ Removed ${appPath}`);
      } catch (error) {
        consola.warn(`⚠️ Could not remove ${appPath}:`, error);
      }
    });
    
    // Remove default packages
    defaultPackages.forEach(pkgPath => {
      const fullPath = path.join(projectPath, pkgPath);
      try {
        rmSync(fullPath, { recursive: true, force: true });
        consola.info(`🗑️ Removed ${pkgPath}`);
      } catch (error) {
        consola.warn(`⚠️ Could not remove ${pkgPath}:`, error);
      }
    });
    
    // Create clean apps directory
    const appsDir = path.join(projectPath, 'apps');
    try {
      rmSync(appsDir, { recursive: true, force: true });
      mkdirSync(appsDir, { recursive: true });
      consola.info('📁 Created clean apps directory');
    } catch (error) {
      consola.warn('⚠️ Could not recreate apps directory:', error);
    }
    
    consola.success('✅ Turborepo initialized and cleaned up.');
  } catch (error) {
    consola.error('❌ Failed to initialize Turborepo:', error);
    throw error;
  }
}
