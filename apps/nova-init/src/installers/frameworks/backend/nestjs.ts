import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

// NestJS framework configuration
const NESTJS_CONFIG = {
  name: 'NestJS',
  supportedLanguages: ['typescript'] as Language[], // NestJS ist TypeScript-first
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], // Yarn entfernt
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  installCommand: {
    default: 'npm i -g @nestjs/cli',
  },
  createCommands: {
    typescript: 'nest new .',
  },
};

export async function installNestJS(
  targetPath: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {
    // Validate language support (NestJS ist TypeScript-first)
    if (!NESTJS_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`NestJS does not support language: ${language}. NestJS ist TypeScript-first.`);
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

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    // Install NestJS app
    await packageManagerUtils.executeCommand(targetPath, 'npm', ['init', 'nestjs-app', '.', '-p', packageManager]);

    consola.success(`✅ NestJS (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install NestJS:`, error);
    throw error;
  }
}

export const getNestJSConfig = () => NESTJS_CONFIG;