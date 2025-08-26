import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

// Angular framework configuration
const ANGULAR_CONFIG = {
  name: 'Angular',
  supportedLanguages: ['typescript'] as Language[], // Angular is TypeScript-first
  supportedPackageManagers: ['npm', 'pnpm'] as PackageManager[], // Bun support is limited for Angular
  supportsVite: false,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 4200,
  installCommand: {
    default: 'npx @angular/cli@latest new',
  },
  createCommands: {
    typescript: 'npx @angular/cli@latest new . --routing --style css --package-manager npm --skip-git',
    javascript: 'npx @angular/cli@latest new . --routing --style css --package-manager npm --skip-git', // Angular is TS-first
  },
  scripts: {
    dev: 'ng serve',
    build: 'ng build',
    start: 'ng serve',
  },
};

export async function installAngular(
  targetPath: string, 
  projectName: string, 
  language: Language = 'typescript', 
  packageManager: PackageManager = 'npm'
) {
  try {
    // Validate language support (Angular is TypeScript-first)
    if (!ANGULAR_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Angular does not support language: ${language}. Angular is TypeScript-first. Supported: ${ANGULAR_CONFIG.supportedLanguages.join(', ')}`);
    }
    
    // Validate package manager support
    if (!ANGULAR_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Angular does not support package manager: ${packageManager}. Supported: ${ANGULAR_CONFIG.supportedPackageManagers.join(', ')}`);
    }
    
    consola.info(`📦 Installing Angular (${language}) in "${targetPath}"...`);

    // Ensure target directory exists
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }
    
    // Use Angular CLI create command
    const command = ANGULAR_CONFIG.createCommands[language].replace(
      '--package-manager npm', 
      `--package-manager ${packageManager}`
    );
    PackageManagerUtils.execCommand(command, targetPath);
    
    // Switch to target package manager if different from npm
    if (packageManager !== 'npm') {
      PackageManagerUtils.switchAndInstallDependencies(packageManager, targetPath);
    }
    
    consola.success(`✅ Angular (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Angular:`, error);
    throw error;
  }
}

// Export configuration for external access if needed
export const getAngularConfig = () => ANGULAR_CONFIG;
