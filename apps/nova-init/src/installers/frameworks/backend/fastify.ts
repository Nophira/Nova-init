import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

// Fastify framework configuration
const FASTIFY_CONFIG = {
  name: 'Fastify',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], // Yarn entfernt
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  createCommands: {
    typescript: 'init fastify@latest . -- --lang=ts',
    javascript: 'init fastify@latest .',
  },
};

export async function installFastify(
  targetPath: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {
    // Validate language support
    if (!FASTIFY_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Fastify does not support language: ${language}. Supported: ${FASTIFY_CONFIG.supportedLanguages.join(', ')}`);
    }

    // Validate package manager support
    if (!FASTIFY_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Fastify does not support package manager: ${packageManager}. Supported: ${FASTIFY_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Fastify (${language}) in "${targetPath}"...`);

    // Ensure target directory exists
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);



    // Install dependencies
    const command = FASTIFY_CONFIG.createCommands[language];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Fastify (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Fastify:`, error);
    throw error;
  }
}

export const getFastifyConfig = () => FASTIFY_CONFIG;