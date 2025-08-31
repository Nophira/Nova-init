import { mkdirSync, existsSync } from 'fs';
import consola from 'consola';
import type { Language, PackageManager } from '../../../types/index.js';
import { PackageManagerUtils } from '../../../core/PackageManagerUtils.js';

// Express framework configuration
const EXPRESS_CONFIG = {
  name: 'Express',
  supportedLanguages: ['typescript', 'javascript'] as Language[],
  supportedPackageManagers: ['npm', 'pnpm', 'bun'] as PackageManager[], // Yarn entfernt
  defaultLanguage: 'typescript' as Language,
  defaultPort: 3000,
  installCommand: {
    default: 'npm init -y', // Express benötigt manuelle Installation
  },
  createCommands: {
    typescript: 'npm install express typescript @types/node @types/express --save-dev && npm install nodemon ts-node --save-dev',
    javascript: 'npm install express --save',
  },
};

export async function installExpress(
  targetPath: string,
  language: Language = 'typescript',
  packageManager: PackageManager = 'npm'
): Promise<void> {
  try {
    // Validate language support
    if (!EXPRESS_CONFIG.supportedLanguages.includes(language)) {
      throw new Error(`Express does not support language: ${language}. Supported: ${EXPRESS_CONFIG.supportedLanguages.join(', ')}`);
    }

    // Validate package manager support
    if (!EXPRESS_CONFIG.supportedPackageManagers.includes(packageManager)) {
      throw new Error(`Express does not support package manager: ${packageManager}. Supported: ${EXPRESS_CONFIG.supportedPackageManagers.join(', ')}`);
    }

    consola.info(`📦 Installing Express (${language}) in "${targetPath}"...`);

    // Ensure target directory exists
    if (!existsSync(targetPath)) {
      mkdirSync(targetPath, { recursive: true });
      consola.info(`Created directory: ${targetPath}`);
    }

    const packageManagerUtils = new PackageManagerUtils(packageManager);

    // Initialize project
    await packageManagerUtils.executeCommand(targetPath, EXPRESS_CONFIG.installCommand.default.split(' ')[0], EXPRESS_CONFIG.installCommand.default.split(' ').slice(1));

    // Install dependencies
    const command = EXPRESS_CONFIG.createCommands[language];
    await packageManagerUtils.executeCommand(targetPath, command.split(' ')[0], command.split(' ').slice(1));

    consola.success(`✅ Express (${language}) installed successfully with ${packageManager}`);
  } catch (error) {
    consola.error(`❌ Failed to install Express:`, error);
    throw error;
  }
}

export const getExpressConfig = () => EXPRESS_CONFIG;