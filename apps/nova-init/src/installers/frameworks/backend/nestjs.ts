import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

// NestJS framework configuration
const NESTJS_CONFIG = {
  name: 'NestJS',
  supportedLanguages: ['typescript'] as Language[], // NestJS is TypeScript-first
  supportedPackageManagers: ['npm', 'pnpm'] as PackageManager[], // Bun support is limited for NestJS
  supportsVite: false,
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  installCommand: {
    default: 'npx @nestjs/cli@latest new',
  },
  createCommands: {
    typescript: 'npx @nestjs/cli@latest new . --package-manager npm --skip-git',
    javascript: 'npx @nestjs/cli@latest new . --package-manager npm --skip-git', // NestJS is TS-first
  },
  scripts: {
    dev: 'npm run start:dev',
    build: 'npm run build',
    start: 'npm run start:prod',
  },
};

export async function installNestJS(
  targetPath: string, 
  language: Language = 'typescript', 
  packageManager: PackageManager = 'npm'
) {
  try {
    // Validate language support (NestJS is TypeScript-first)
    if (!NESTJS_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`NestJS does not support language: ${language}. NestJS is TypeScript-first. Supported: ${NESTJS_CONFIG.supportedLanguages.join(', ')}`);
    }
    
    // Validate package manager support
    if (!NESTJS_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`NestJS does not support package manager: ${packageManager}. Supported: ${NESTJS_CONFIG.supportedPackageManagers.join(', ')}`);
    }
    
    consola.info(`📦 Installing NestJS (${language}) in "${targetPath}"...`);

    // Ensure target directory exists
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }
    
    // Use NestJS CLI create command with appropriate package manager
    const command = NESTJS_CONFIG.createCommands[language].replace(
      '--package-manager npm',
      `--package-manager ${packageManager}`
    );
    PackageManagerUtils.execCommand(command, targetPath);
    
    // Switch to target package manager if different from npm
    if (packageManager !== 'npm') {
      PackageManagerUtils.switchAndInstallDependencies(packageManager, targetPath);
    }
    
    consola.success(`✅ NestJS (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install NestJS:`, error);
    throw error;
  }
}

// Export configuration for external access if needed
export const getNestJSConfig = () => NESTJS_CONFIG;
